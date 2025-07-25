import Mock from 'mockjs'
import type { Course, ScheduleResponse } from '../types'

// 模拟课表数据
const generateScheduleData = (): ScheduleResponse => {
  const data = Mock.mock({
    code: 200,
    message: 'success',
    data: {
      星期一: [
        {
          section: Mock.mock({ 'section|1': ['1.2', '3.4', '5.6', '7.8'] })
            .section,
          courseCode: Mock.mock("@string('upper', 15, 20)"),
          courseName: Mock.mock('@cword(5, 12)'),
          teacher: Mock.mock('@cname'),
          typeStatus: Mock.mock({
            'typeStatus|1': ['必修 (理论) (正常)', '选修 (实验实践) (正常)'],
          }).typeStatus,
          location: Mock.mock('@integer(1, 16)周 @word(1)@integer(100, 500)'),
        } as Course,
      ],
      星期二: [
        {
          section: Mock.mock({ 'section|1': ['1.2', '3.4', '5.6', '7.8'] })
            .section,
          courseCode: Mock.mock("@string('upper', 15, 20)"),
          courseName: Mock.mock('@cword(5, 12)'),
          teacher: Mock.mock('@cname'),
          typeStatus: Mock.mock({
            'typeStatus|1': ['必修 (理论) (正常)', '选修 (实验实践) (正常)'],
          }).typeStatus,
          location: Mock.mock('@integer(1, 16)周 @word(1)@integer(100, 500)'),
        } as Course,
      ],
      星期三: [
        {
          section: Mock.mock({ 'section|1': ['1.2', '3.4', '5.6', '7.8'] })
            .section,
          courseCode: Mock.mock("@string('upper', 15, 20)"),
          courseName: Mock.mock('@cword(5, 12)'),
          teacher: Mock.mock('@cname'),
          typeStatus: Mock.mock({
            'typeStatus|1': ['必修 (理论) (正常)', '选修 (实验实践) (正常)'],
          }).typeStatus,
          location: Mock.mock('@integer(1, 16)周 @word(1)@integer(100, 500)'),
        } as Course,
      ],
      星期四: [
        {
          section: Mock.mock({ 'section|1': ['1.2', '3.4', '5.6', '7.8'] })
            .section,
          courseCode: Mock.mock("@string('upper', 15, 20)"),
          courseName: Mock.mock('@cword(5, 12)'),
          teacher: Mock.mock('@cname'),
          typeStatus: Mock.mock({
            'typeStatus|1': ['必修 (理论) (正常)', '选修 (实验实践) (正常)'],
          }).typeStatus,
          location: Mock.mock('@integer(1, 16)周 @word(1)@integer(100, 500)'),
        } as Course,
      ],
      星期五: [
        {
          section: Mock.mock({ 'section|1': ['1.2', '3.4', '5.6', '7.8'] })
            .section,
          courseCode: Mock.mock("@string('upper', 15, 20)"),
          courseName: Mock.mock('@cword(5, 12)'),
          teacher: Mock.mock('@cname'),
          typeStatus: Mock.mock({
            'typeStatus|1': ['必修 (理论) (正常)', '选修 (实验实践) (正常)'],
          }).typeStatus,
          location: Mock.mock('@integer(1, 16)周 @word(1)@integer(100, 500)'),
        } as Course,
      ],
      星期六: [],
      星期日: [],
    },
  }) as ScheduleResponse
  console.log('mock课表数据:', data)
  return data
}

// 注册Mock接口
Mock.mock('/api/schedule', 'get', generateScheduleData)

export default generateScheduleData
