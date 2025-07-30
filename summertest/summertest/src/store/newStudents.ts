import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSchedule } from '../service/scheduleApi'
import type { Course, WeekCourse } from '../service/types'

// 定义星期顺序常量
const DAY_ORDER = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

export const fetchnewstudents = createAsyncThunk(
  'newstudents/fetchnewstudents',
  async () => {
    const res = await getSchedule()
    return res.data
  },
)

const newstudentsSlice = createSlice({
  name: 'newstudents',
  initialState: {
    weeks: [] as WeekCourse[],
    allCourses: [] as Course[][], // 添加按星期分组的课程数组
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearNewStudentsData: (state) => {
      state.weeks = []
      state.allCourses = [] // 重置按星期分组的课程数据
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchnewstudents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchnewstudents.fulfilled, (state, action) => {
        state.loading = false
        const scheduleData = action.payload.data || {}
        const weekMap = new Map<
          number,
          { weekNumber: number; dailyCourses: Course[][] }
        >()

        // 处理数据并转换为WeekCourse格式
        Object.entries(scheduleData)
          .filter(([day]) => DAY_ORDER.includes(day))
          .forEach(([day, dayCourses]) => {
            if (Array.isArray(dayCourses)) {
              dayCourses.forEach((course: Course) => {
                const weekNumber = course.weekNumber || 1
                let weekData = weekMap.get(weekNumber)

                if (!weekData) {
                  weekData = {
                    weekNumber,
                    dailyCourses: DAY_ORDER.map(() => []),
                  }
                  weekMap.set(weekNumber, weekData)
                }

                const dayIndex = DAY_ORDER.indexOf(day)
                if (dayIndex !== -1) {
                  weekData.dailyCourses[dayIndex].push({
                    ...course,
                    courseName: 'others', // 强制课程名称
                    id:
                      typeof course.id === 'number'
                        ? course.id
                        : parseInt(
                            `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`.replace(
                              /\D/g,
                              '',
                            ),
                          ) || 0,
                  })
                }
              })
            }
          })

        // 转换为WeekCourse格式数组
        state.weeks = Array.from(weekMap.values())
          .sort((a, b) => a.weekNumber - b.weekNumber)
          .map((weekData) => ({
            weekNumber: weekData.weekNumber,
            dailyCourses: weekData.dailyCourses,
            courses: weekData.dailyCourses
              .flat()
              .sort((a, b) => a.section - b.section),
          }))

        // 新增：按星期分组收集所有课程
        state.allCourses = Array.from({ length: 7 }, () => [])
        state.weeks.forEach((week) => {
          week.dailyCourses.forEach((dayCourses, dayIndex) => {
            // 将每天的课程添加到对应星期的数组中
            state.allCourses[dayIndex].push(...dayCourses)
          })
        })
      })
      .addCase(fetchnewstudents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || '获取新同学课程失败'
      })
  },
})

export const { clearNewStudentsData } = newstudentsSlice.actions
export default newstudentsSlice.reducer
