import Mock from 'mockjs'
import type { Course, ScheduleResponse } from '../types'
import { generateDateRange } from '@/utils/generateDateRange'
import {
  courseNames,
  teacherNames,
  classRooms,
  sectionTimeMap,
} from '@/assets/data/coursesdetail'

const generateScheduleData = (): ScheduleResponse => {
  // 生成日期范围 (2024-02-24 至 2024-07-14)
  const dateRange = generateDateRange('2025-02-24', '2025-03-23')

  // 计算第20周周一日期 (2024-07-05)
  const cutoffDate = new Date('2025-03-23')

  // 按星期几组织课程数据
  const scheduleData: Record<
    '周一' | '周二' | '周三' | '周四' | '周五' | '周六' | '周日',
    Course[]
  > = {
    周一: [],
    周二: [],
    周三: [],
    周四: [],
    周五: [],
    周六: [],
    周日: [],
  }

  let id = 1

  // 为每个日期生成课程
  dateRange.forEach((dateInfo) => {
    const { date, day } = dateInfo
    const currentDate = new Date(date)

    // 第二十周周一(2024-07-05)之后不排课
    if (currentDate > cutoffDate) {
      return
    }

    const isWeekend = day === '周六' || day === '周日'
    const availableSections = isWeekend ? [7, 9] : [1, 3, 5]

    // 随机生成1~availableSections.length门课
    const courseCount = Mock.Random.integer(1, availableSections.length)
    const sections = Mock.Random.shuffle(availableSections).slice(
      0,
      courseCount,
    )

    sections.forEach((section) => {
      // 随机决定是否是周期性课程
      const isCyclic = Mock.Random.boolean(7, 3, true) // 70%概率是周期性课程
      const weekNumber =
        Math.floor(
          (new Date(date).getTime() - new Date('2025-02-24').getTime()) /
            (7 * 24 * 60 * 60 * 1000),
        ) + 1

      const course = {
        id,
        date,
        day,
        section,
        weekNumber,
        name: Mock.Random.pick(courseNames),
        place: Mock.Random.pick(classRooms),
        teacher: Mock.Random.pick(teacherNames),
        type: Mock.Random.pick(['必修', '选修', '实践']),
        time: sectionTimeMap[section as keyof typeof sectionTimeMap],
        cycle: isCyclic ? `${weekNumber}-16周` : undefined,
        courseCode: Mock.mock('@string("upper", 8)'),
        courseName: Mock.Random.pick(courseNames),
        typeStatus: Mock.Random.pick([
          '必修 (理论) (正常)',
          '选修 (实验实践) (正常)',
        ]),
        location: Mock.Random.pick(classRooms),
      }

      // 添加到对应星期的课程列表
      if (scheduleData[day as keyof typeof scheduleData]) {
        scheduleData[day as keyof typeof scheduleData]!.push(course as Course)
      }

      id++
    })
  })

  const data = Mock.mock({
    code: 200,
    message: 'success',
    data: scheduleData,
  }) as ScheduleResponse

  return data
}
Mock.mock(/\/api\/schedule/, 'get', generateScheduleData)

export default generateScheduleData
