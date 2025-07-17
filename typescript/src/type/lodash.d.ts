declare module "lodash" {//导入时from后的名称
    export function join(...args: any[]): any
}

//第三方包自己未写ts文件，ts官方也未写过type的情况下需要自己配置



//声明文件模块
declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.svg"


//定义全局变量的类型声明(为js文件声明)
declare const zmyName: string
declare function chc(bar: string): string

