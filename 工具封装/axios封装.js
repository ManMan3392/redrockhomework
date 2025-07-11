import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
import useMainStore from '@/stores/modules/main'

const mainStore = useMainStore()

class HYRequest {
  constructor(baseURL, timeout = 10000) {
    //使用 axios.create 创建独立实例，避免全局污染，
    // 每个实例可配置不同的 baseURL 和 timeout
    this.instance = axios.create({
      baseURL,
      timeout
    })
    //拦截器判断响应状态
    this.instance.interceptors.request.use(config => {
      mainStore.isLoading = true
      return config
    }, err => {
      return err
    })
    this.instance.interceptors.response.use(res => {
      mainStore.isLoading = false
      return res
    }, err => {
      mainStore.isLoading = false
      return err
    })
  }

  request(config) {
    // mainStore.isLoading = true
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
        // mainStore.isLoading = false
      }).catch(err => {
        reject(err)
        // mainStore.isLoading = false
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new HYRequest(BASE_URL, TIMEOUT)


