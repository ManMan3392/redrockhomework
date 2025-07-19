import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"


interface MyInterceptors<T> {
    requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
    requestFailureFn?: (err: any) => any
    responseSuccessFn?: (res: T) => T
    responseFailureFn?: (err: any) => any
}
type CombineRequestConfig = AxiosRequestConfig & InternalAxiosRequestConfig
interface MyRequestConfig<T = AxiosResponse> extends CombineRequestConfig {
    interceptors?: MyInterceptors<T>
}


class MyRequest {
    //request示例=>axios实例
    instance: AxiosInstance
    constructor(config: MyRequestConfig) {
        this.instance = axios.create(config)

        //全局拦截器
        this.instance.interceptors.request.use(config => {
            console.log('全局请求成功的拦截')
            return config
        }, err => {
            console.log('全局请求失败的拦截')
            return err
        })
        this.instance.interceptors.response.use(res => {
            console.log('全局响应成功的拦截')
            return res
        }, err => {
            console.log('全局响应失败的拦截')
            return err
        })


        //针对特定请求添加拦截器
        this.instance.interceptors.request.use(
            config.interceptors?.requestSuccessFn,
            config.interceptors?.requestFailureFn
        )
        this.instance.interceptors.response.use(
            config.interceptors?.responseSuccessFn,
            config.interceptors?.responseFailureFn
        )


    }

    //封装网络请求
    request<T = any>(config: MyRequestConfig<T>) {
        //单次请求拦截，不能加入拦截器，会让所有实例都有拦截器
        if (config.interceptors?.requestSuccessFn) config = config.interceptors?.requestSuccessFn(config)
        return new Promise<T>((resolve, reject) => {
            this.instance.request<any,T>(config).then(
                res => {
                    if (config.interceptors?.responseSuccessFn) {
                        res = config.interceptors.responseSuccessFn(res)
                    }
                    resolve(res)
                }
            ).catch(err => {
                reject(err)
            })
        })
    }
    get<T = any>(config:MyRequestConfig<T>) {
        return this.request({...config,method:"GET"})
    }
    post<T = any>(config:MyRequestConfig<T>) {
        return this.request({...config,method:"POST"})
    }
    delete<T = any>(config:MyRequestConfig<T>) {
        return this.request({...config,method:"DELETE"})
    }
    patch<T = any>(config:MyRequestConfig<T>) {
        return this.request({...config,method:"PATCH"})
    }

}

export default MyRequest