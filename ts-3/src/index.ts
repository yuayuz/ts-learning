// number

// const 让 ts 推导出的值是某个具体数字
const num1 = 100
// 处理较长的数字是，为了便于分辨，建议使用数字分隔符

let oneMillion = 1_000_000
console.log(oneMillion)

// 结构化类型--一种编程设计风格，只关心对象有那些属性而不管属性使用什么名称（名义化类型）

// 对象
// 把一个值声明为 object 类型(只需要一个对象，但是对对象字段没有要求时使用)
let a: object = {
    b: "x"
} // 无法对 b 进行操作

// 对象字面里量！！！！
let a1: { b1: number } = {  // 可以让 ts 推导对象结构，也可以在花括号中明确描述
    b1: 12
}
console.log(a1)

let c: {
    firstName: string,
    lastName: string
} = {
    firstName: 'john',
    lastName: 'barrowman'
}

class Person {
    constructor(
        public firstName: string,
        public lastName: string
    ) {
    }
}

c = new Person("matt", "smith") // c 与 Person 结构一样，因此允许将 Person 的实例赋值给c
console.log(c)

// 属性可选，多个属性
let d: {
    b: number,
    c?: string  // 可选符号--？
    [key: number]: string
}

d = {
    b: 123,
}
d = {
    b: 1,
    c: "2"
}
d = {
    b: 1,
    1: "2",
    2: "ts-3"
}
console.log(d)
// [key:T]:U 可以告诉 Ts 指定的对象可能有更多的键；键的类型（T）必须可赋值给 number 或者 string；
// 键的名称可以使用任何词不一定是 key


// 类型别名
// 同一类型不能声明两次
// 类型别名采用块级作用域
type Age = number
type Person1 = {
    name: string,
    age: Age
}
// Ts 无法推导类型别名，因此要显式注解
let age1: Age = 55
let driver: Person1 = {
    name: "小明",
    age: age1
}
// 或者
let age2=30
let driver2: Person1 = {
    name:"小红",
    age: age2
}

// 数组


let e1=[1,2,3,4,5]
let e2 = ["1","2","ts-3","4","5","6","7","8","9"];
let e3=["1",2,3]  // 数组应该保持同质

// 元组
// 元组是 array 的子类性，是定义数组的一种特殊方式，长度固定且个索引位上的值具有固定的已知类型
// ！！声明元组时必须显示注解类型
// 支持可选类型
let f1:[number]=[1]
let f2:[number,string,number]=[123,"小明",15]

// 只读数组和元组
// Ts 原生支持只读数组类型，用于创建不可变数组
// readonly,Readonly,ReadonlyArray
let f3: readonly number[]=[1,2,3,4,5]
let f4:readonly [string,string]=["1","2"];
console.log(typeof f1)
console.log(typeof f3)

// undefined----尚未定义
// null----缺少值
// void----函数没有显式返回任何值时的返回类型
// never----函数根本不返回时使用的类型


// 枚举
// 枚举的作用时列举类型中包含的各种值，始终无序数据结构，把键映射到值上
// 两种类型：1、字符串到字符串的映射；2、字符串到数字的映射

enum language{
    Chinese, // 自动推导对应数字
    English
}
// 使用点号或者方括号表示法访问
console.log(language.Chinese);
console.log(language["English"]);
console.log(language[3]); // language[ts-3]不存在，但是 TS 不会阻止；可以使用 const enum 指定枚举的安全子集
// 枚举可以分开声明，成员的值可以计算出（ TS 尽可能推导缺少的值）
// 枚举的值可以为字符串，甚至混用字符串和数字




