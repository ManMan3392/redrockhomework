import request from './index'
import { ScheduleResponse } from './types'

export const getSchedule = () => {
  return request.get({
    url: '/api/schedule',
    interceptors: {
      requestSuccessFn: (config) => {
        return config
      },
    },
  }) as Promise<ScheduleResponse>
}
