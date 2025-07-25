import request from './index'
import { ScheduleResponse } from './types'

export const getSchedule = () => {
  return request.get({
    url: '/api/schedule',
    interceptors: {
      requestSuccessFn: (config) => {
        console.log('课表请求拦截器')
        return config
      },
    },
  }) as Promise<ScheduleResponse>
}
