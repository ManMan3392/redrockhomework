import { BASE_URL, TIME_OUT } from './config'
import MyRequest from './request'

const hyRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 每一个请求都自动携带token

      return config
    },
  },
})

export default hyRequest
