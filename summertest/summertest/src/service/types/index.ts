export interface Course {
  section: string
  courseCode: string
  courseName: string
  teacher: string
  typeStatus: string
  location: string
}

export interface ScheduleData {
  [key: string]: Course[]
}

export interface ScheduleResponse {
  code: number
  message: string
  data: ScheduleData
}
