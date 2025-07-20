// 1.手动区分开发环境和生产环境
export const BASE_URL = 'http://codercba.com:9002'
// export const BASE_URL = 'http://codercba.prod:8000'

export const TIME_OUT = 10000

//2. 找到当前环境（利用webpack）
// console.log(process.env.NODE_ENV)

// let BASE_URL = ''
// if(process.env.NODE_ENV === 'development') {
//     BASE_URL = 'http://codercba.com:9002'
// } else {
//     BASE_URL = 'http://codercba.com:9002'
// }

//3. 在环境变量中配置文件中加载文件
// console.log(process.env.REACT_APP_URL)
