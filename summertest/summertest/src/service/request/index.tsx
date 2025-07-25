import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface MyInterceptors {
  requestSuccessFn?: (config: any) => any
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: AxiosResponse) => AxiosResponse
  responseFailureFn?: (err: any) => any
}

interface MyRequestConfig extends AxiosRequestConfig {
  interceptors?: MyInterceptors
}

class MyRequest {
  instance: AxiosInstance

  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求拦截成功')
        return config
      },
      (err) => {
        console.log('全局请求拦截失败')
        return err
      },
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局响应拦截成功')
        return res
      },
      (err) => {
        console.log('全局响应拦截失败')
        return err
      },
    )
  }

  request(config: MyRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get(config: MyRequestConfig): Promise<any> {
    return this.request({ ...config, method: 'GET' })
  }

  post(config: MyRequestConfig): Promise<any> {
    return this.request({ ...config, method: 'POST' })
  }

  delete(config: MyRequestConfig): Promise<any> {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch(config: MyRequestConfig): Promise<any> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default MyRequest
