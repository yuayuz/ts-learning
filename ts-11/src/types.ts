// 外参类型声明

type ToArray<T> = T extends unknown[] ? T : T[]

// 可以借助外参声明为应用中常用的数据类型建模
type UserID = string & { readonly brand: unique symbol }

// 外参模块声明： 把常规的类型声明放在特殊的句法 declare module 中
declare module 'module-name'{
    export type MyType=number
    export type MyDefaultType={a:string,b:string,c:string}
    export let myExport:MyType
    let myDefaultType:MyDefaultType
    export default myDefaultType
}
// 模块名称是 import 导入的路径

// 具体类型以后确定，现在可以假设为any
// 声明一个可以被导入的模块，但是导入类型为 any
declare module 'unsafe-module-name'

// 类型声明支持通配符导入，借此可以为匹配指定模式的任何导入路径声明类型，导入路径使用通配符（*）匹配

declare module 'json!*'{
    let value:Object
    export default Object
}

declare module '*.css'{
    let css :CSSRule
    export default css
}