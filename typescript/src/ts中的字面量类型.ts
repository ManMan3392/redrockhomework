const name = 'why'
//此时推导的name类型就是字面量'why'
//可以将多个字面量类型联合起来

type Direction = 'left' | 'right' | 'up' | 'down'
const di: Direction = 'left'

//例子
type MethodType = 'get' | 'post'
function request(url: string, method: MethodType) {

}
request('https://hdjs.com/', 'post')


//错误用法
const info = {
    url: 'xxx',
    method: 'post'
}
// request(info.url,info.method)会报错，因为info.method是字符串类型
request(info.url, info.method as 'post')//类型断言更具体的
//法二：直接定义字面量类型对象
// const info2:{url:string,method:'post' | 'get'} = {
//     url:'xhcgjds',
//     method:'post'
// }

const info2 = {
    url:'xhcgjds',
    method:'post'
} as const//强制字面量类型
request(info2.url,info2.method)

export { }