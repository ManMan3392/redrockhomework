import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
import useMainStore from '@/stores/modules/main'

const mainStore = useMainStore()

class HYRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
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


// import axios from "axios";
// import { BASE_URL, TIMEOUT } from './config'

// class HYRequest {
//     constructor(baseUrl, timeOut) {
//         this.instance = axios.create({
//             baseURL: baseUrl,
//             timeout: timeOut
//         })
//         this.instance.interceptors.response.use((res) => {
//             return res.data
//         }, err => {
//             return err
//         })
//     }
//     request(config) {
//         return this.instance.request(config)
//     }
//     get(config) {
//         return this.request({ ...config, method: 'get' })
//     }
//     post(config) {
//         return this.request({ ...config, method: 'post' })
//     }
// }


// const hyRequest = new HYRequest(BASE_URL, TIMEOUT);


// export default hyRequest;