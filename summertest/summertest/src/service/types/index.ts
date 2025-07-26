export interface Course {
  id: number
  date: string
  day: '周一' | '周二' | '周三' | '周四' | '周五' | '周六' | '周日'
  section: number
  name: string
  place: string
  teacher?: string
  cycle?: string
  time?: string
  type?: '必修' | '选修' | '实践'
}
export interface WeekCourse {
  weekNumber: number
  courses: Course[]
  dailyCourses: Course[][]
}

export interface ScheduleData {
  [key: string]: Course[]
}

export interface ScheduleResponse {
  code: number
  message: string
  data: ScheduleData
}
