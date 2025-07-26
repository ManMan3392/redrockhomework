import MyRequest from './request'

const request = new MyRequest({
  baseURL: '',
  timeout: 1000 * 10,

  interceptors: {
    requestSuccessFn: (config) => {
      return config
    },
    responseSuccessFn: (res) => {
      return res.data
    },
  },
})

export default request
