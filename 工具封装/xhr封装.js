export const myzajax = ({
    url,
    method = "get",
    data = {},
    timeout = 5000,
    headers = {},
} = {}) => {
    const xhr = new XMLHttpRequest()
    //设置响应类型和超时时间
    xhr.responseType = "json"
    xhr.timeout = timeout
    //拼接参数,
    // encodeURIComponent() 是 JavaScript 中的一个内置函数，
    // 用于对 URI（统一资源标识符）的组件进行编码。
    // 它会将字符串中的某些字符转换为百分号编码（% XX）的形式，
    // 以确保这些字符在 URL 中能够被正确传输和解析。
    const pramas = Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`)
    const pramasstring = pramas.join("&")
    //分get和其他请求发送
    if (method.toLowerCase() === "get") {
        xhr.open(method, url + "?" + pramasstring)
        xhr.send()
    } else {
        xhr.open(method, url)
        //设置请求头
        for (const headerKey in headers) {
            xhr.setRequestHeader(headerKey, headers[headerKey])
        }
        if (Object.values(headers)[0] == 'application/x-www-form-urlencoded') {
            xhr.send(pramasstring)
        } else if (Object.values(headers)[0] == 'application/json') {
            xhr.send(JSON.stringify(data))
        } else {
            const form = new FormData()
            for (const key in data) {
                form.append(key, data[key])
            }
            xhr.send(form)
        }
    }
    //发送请求结果
    const promise = new Promise((resolve, reject) => {
        //错误处理
        xhr.onerror = () => {
            reject("Network error");
        };

        // 请求取消处理
        xhr.onabort = () => {
            reject("Request aborted");
        };
        //监听超时
        xhr.ontimeout = () => {
            reject("timeout")
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status <= 300 || xhr.status === 304) {
                resolve(xhr.response)
            } else {
                reject(xhr.response)
            }
        }
    })
    // 添加取消请求的方法
    promise.abort = () => xhr.abort()
    promise.xhr = xhr
    return promise
}

// GET 请求示例
myzajax({
    url: 'http://123.207.32.32:1888/02_param/get',
    data: { page: 1, limit: 20 }
})
    .then(response => console.log('数据:', response))
    .catch(error => console.error('请求失败:', error));

// POST urlencoded 请求示例
// myzajax({
//     url: 'http://123.207.32.32:1888/02_param/posturl',
//     method: 'POST',
//     headers: { 'Content-type': 'application/x-www-form-urlencoded' },
//     data: { username: 'test', password: '123456' }
// }).then(response => console.log('数据:', response)).catch(
//     error => console.error('请求失败:', error)
// )
// POST JSON 请求示例
// myzajax({
//     url: 'http://123.207.32.32:1888/02_param/postjson',
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     data: { username: 'test', password: '123456' }
// }).then(response => console.log('数据:', response)).catch(
//     error => console.error('请求失败:', error)
// )
// POST formdata 请求示例
// myzajax({
//     url: 'http://123.207.32.32:1888/02_param/postform',
//     method: 'POST',
//     data: { username: 'test', password: '123456' }
// }).then(response => console.log('数据:', response)).catch(
//     error => console.error('请求失败:', error)
// )
