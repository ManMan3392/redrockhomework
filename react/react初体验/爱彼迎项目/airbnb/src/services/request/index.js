import axios from "axios";
import { BASE_URL, TIMEOUT } from './config'

class HYRequest {
    constructor(baseUrl, timeOut) {
        this.instance = axios.create({
            baseURL: baseUrl,
            timeout: timeOut
        })
        this.instance.interceptors.response.use((res) => {
            return res.data
        }, err => {
            return err
        })
    }
    request(config) {
        return this.instance.request(config)
    }
    get(config) {
        return this.request({ ...config, method: 'get' })
    }
    post(config) {
        return this.request({ ...config, method: 'post' })
    }
}


const hyRequest = new HYRequest(BASE_URL, TIMEOUT);


export default hyRequest;