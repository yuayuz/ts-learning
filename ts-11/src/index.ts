// 类型说明
// 类型说明文件的扩展名为 .d.ts。类型声明配合 JSDoc 注解
// 类型说明只能包含类型，不能有值
// 类型说明虽然不能定义值，但是可以声明 js 代码中定义了某个值
// 类型声明只声明使用方可见的类型

// 类型说明文件的作用：向 ts 说明 js 文件中定义的类型信息
// 类型声明描述的是外参环境，使用 declare 关键字声明 角色文件中定义了某个变量
// 类型声明不管任何用途，始终放在脚本模式下的 .ts 或者 .d.ts 文件中

function toArray<T>(arr: T[]) {
    return Array.from(new Set(arr));
}
let A=toArray([1, 2, 3])
console.log(A)

import ModuleName from 'module-name'
ModuleName.a

// 嵌套模块必须使用完整导入路径

import {x} from 'unsafe-module-name'
x // any

import a from 'json!myFile'
a // object

import b from ',/widget.css'
b // CSSRuleList
