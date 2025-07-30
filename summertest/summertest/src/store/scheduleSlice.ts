import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSchedule } from '../service/scheduleApi'
import type { Course, WeekCourse } from '../service/types'

// 修复异步Thunk，正确处理数据并返回
export const fetchSchedule = createAsyncThunk(
  'schedule/fetchSchedule',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSchedule()
      return response.data.data // 只返回接口中的data字段内容
    } catch (error) {
      return rejectWithValue('获取课程表失败')
    }
  },
)

// 定义星期顺序的常量数组，用于排序
const DAY_ORDER = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    weeks: [] as WeekCourse[],
    allCourses: [] as Course[][]  // 修改为二维数组
  },
  reducers: {
    addCourseToWeek: (state, action) => {
      const { weekNumber, dayNumber, course } = action.payload
      const weekIndex = state.weeks.findIndex(
        (w) => w.weekNumber === Number(weekNumber),
      )
      if (weekIndex !== -1) {
        state.weeks[weekIndex].dailyCourses[Number(dayNumber)].push(course)
      }
    },
    removeCourse: (state, action) => {
      const courseId = action.payload
      state.weeks.forEach((week) => {
        week.dailyCourses.forEach((dayCourses, dayIndex) => {
          week.dailyCourses[dayIndex] = dayCourses.filter(
            (course) => course.id !== courseId,
          )
        })
      })
    },
    updateCourseTime: (state, action) => {
      const { id, dayNumber, section } = action.payload
      state.weeks.forEach((week) => {
        week.dailyCourses.forEach((dailyCourse) => {
          const courseIndex = dailyCourse.findIndex((c) => c.id === id)
          if (courseIndex !== -1) {
            // 更新课程时间信息
            dailyCourse[courseIndex].dayNumber = dayNumber
            dailyCourse[courseIndex].section = section
          }
        })
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSchedule.fulfilled, (state, action) => {
      const validDays = DAY_ORDER

      // 创建周数据映射表
      const weekMap = new Map<
        number,
        { weekNumber: number; dailyCourses: Course[][] }
      >()

      // 处理课程数据并按周分组
      Object.entries(action.payload)
        .filter(([day]) => validDays.includes(day))
        .forEach(([day, dayCourses]) => {
          if (Array.isArray(dayCourses)) {
            dayCourses.forEach((course: Course) => {
              // 计算周数
              // 直接使用课程数据中已有的weekNumber
              const weekNumber = course.weekNumber

              // 获取或创建周数据
              let weekData = weekMap.get(weekNumber)
              if (!weekData) {
                weekData = {
                  weekNumber,
                  dailyCourses: DAY_ORDER.map(() => []), // 按周一到周日初始化空数组
                }
                weekMap.set(weekNumber, weekData)
              }

              // 将课程添加到对应星期的数组
              const dayIndex = DAY_ORDER.indexOf(day)
              if (dayIndex !== -1) {
                weekData.dailyCourses[dayIndex].push({
                  ...course,
                  day: day as any,
                  id:
                    typeof course.id === 'number'
                      ? course.id
                      : Number(
                          `${course.date}-${course.section}`
                            .split('')
                            .reduce((acc, char) => acc + char.charCodeAt(0), 0),
                        ),
                })
              }
            })
          }
        })

      // 整理周数据并排序
      state.weeks = Array.from(weekMap.values())
        .sort((a, b) => a.weekNumber - b.weekNumber)
        .map((weekData) => ({
          weekNumber: weekData.weekNumber,
          courses: weekData.dailyCourses
            .flat()
            .sort((a, b) => a.section - b.section),
          dailyCourses: weekData.dailyCourses.map((dayCourses) =>
            dayCourses.sort((a, b) => a.section - b.section)
          ),
        }))

      // 修改allCourses数据处理逻辑
      // 初始化一个包含7个空数组的二维数组，对应周一到周日
      state.allCourses = Array.from({ length: 7 }, () => [])

      // 遍历所有周和每天的课程，按星期索引分组
      state.weeks.forEach(week => {
        week.dailyCourses.forEach((dayCourses, dayIndex) => {
          // 将每天的课程添加到对应星期的数组中
          state.allCourses[dayIndex].push(...dayCourses)
        })
      })
    })
    // 移除rejected状态处理（初始状态中无loading和error字段）
  },
})
export const { addCourseToWeek, removeCourse, updateCourseTime } =
  scheduleSlice.actions
export default scheduleSlice.reducer
