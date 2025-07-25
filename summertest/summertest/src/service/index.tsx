import MyRequest from './request'

const request = new MyRequest({
  baseURL: '',
  timeout: 1000 * 10,

  interceptors: {
    requestSuccessFn: (config) => {
      console.log('实例请求拦截成功')
      return config
    },
    responseSuccessFn: (res) => {
      return res.data
    },
  },
})

export default request
