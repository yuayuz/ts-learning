/*显式注解函数参数：ts能推导但是多数情况下无法推导出参数类型*/

// 声明函数的方式
// 具名函数
import {urlToHttpOptions} from "node:url";

function greet(name: string) {
    return "hello" + name;
}

// 函数表达式
let greets = function (name: string) {
    return `Hello ${name}!`;
}
// 箭头函数表达式
let greet3 = (name: string) => {
    `Hello ${name}!`;
}
// 箭头函数简写表达式
let greet4 = (name: string) => "Hello " + name;
// 函数构造方法
let greet5 = new Function('name', "return 'hello'+name")


/*可选和默认参数*/
// 使用？将参数标记为可选的，可选参数要位于正常参数后面

type Context = {
    appId?: string,
    userId?: string
}

function log(message: string, context: Context = {userId: "123"}) {
    let time = new Date().toString()
    console.log(time, message, context.userId)
}

log('Hello World!',);

/*剩余参数(rest parameter)*/
// 数组作为参数
let sum = function (numbers: number[]) {
    console.log(numbers.reduce((a, b) => a + b));
}
sum([1, 2, 3])

function sumVariadicSafe(...numbers: number[]) {  //一个函数只能有一个剩余参数，而且必须位于参数列表的最后
    console.log(numbers.reduce((a, b) => a + b));
}

sumVariadicSafe(1, 2, 3)


/*call,apply,bind*/
// apply()与call()跟js用法一致，第一个参数绑定this，第二个参数作为参数传入被调用的函数中；call按顺序应用参数而非数组
// bind()并不调用函数，而返回一个新函数，通过（），.call或者.apply调用

/*注解this的类型*/
// this的值却月与调用函数的方式，而不受声明方式的干扰


// ！！！！！Ts：函数如果使用this，要在函数的第一个参数中声明this的类型（放在其他参数之前）-确保this时期待的类型


/*生成器---生成一系列值的便利方式*/
// 函数名称前的*表示生成器函数；调用生成器返回一个可迭代的迭代器
// 生成器使用yield关键字产出值

function* crateNumbers() {
    let n = 0
    while (n <= 100) {
        yield n++
    }
}

let numbers = crateNumbers()
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());

/*迭代器*/
// 生成器时生成一系列值的方式，而迭代器时消费这些值的方式
// 可迭代对象--有Symbol.iterator属性的对象，而且该属性的值为一个函数，返回一个迭代器
// 迭代器----定义有next方法的对象，该方法返回一个具有value和done属性的对象
// 调用生成器，得到的值既是可迭代对象也时迭代器，称为可迭代的迭代器

// 定义迭代器

let numbers1 = {
    * [Symbol.iterator]() {
        for (let n = 1; n < 10; n++) {
            yield n
        }
    }
}

// 使用for-of迭代一个迭代器
for (let a of numbers1) {
    console.log(a)
}
// 展开一个迭代器
let allNumbers = [...numbers1]
console.log(allNumbers)
// 解构一个迭代器
let [one, two, ...rest] = numbers1
console.log(`one${one},two${two},rest${rest}`)


/*调用签名（类型签名）*/
// 表示sum的类型----（a:number,b:number）=》number
// 类型签名值包含类型层面的代码，只有类型没有值
type Sum = (a: number, b: number) => void

let sum1: Sum = (a, b) => {
    console.log(a + b)
}
sum1(2, 3)


// ts具有上下文类型推导

/*函数类型重载*/
// 简写型调用签名
type Log1 = (msg: string, context: Context) => number
// 完整型调用签名
type Log2 = {
    (msg: string, context: Context): number
}

// 重载函数---有多个调用签名的函数
// js是一门动态语言，需要多种方式调用一个函数的方法，甚至有时输出的类型取决于输入的类型

type Sum2 = {
    (a: number, b: number, c: number): number,
    (a: number, b: string): number
}
let sum2: Sum2 = (
    a: number,
    b: number | string,
    c?: number
) => {
    let n = 0
    if (typeof b === "number" && c !== undefined) {
        n = a + b + c
    } else if (typeof b === "string" && c === undefined) {
        n = a
    }
    return n
}
console.log(sum2(1, 2, 3))
console.log(sum2(1, "2"))

/*多态*/
// 泛型参数--在类型层面施加约束的占位类型，也称为多态类型参数
type Log = {
    <T>(array: T[],f:(item :T[])=>void): void
}
let log1: Log = (a,f)=>{
    f(a)
}
let a1=[1,2,3,4,5,6,7,8,9]
let a2=["1", "2", 3]
log1(a1,(a1)=>console.log(a1[0]))
log1(a2,(a2)=>console.log(a2[1]))


// 绑定泛型的时间
// 在调用签名中声明（位于签名的开始圆括号前面），ts将在调用这个类型的函数时为T绑定具体类型
type Filter={
    <T>(array:T[],f:(item :T[])=>void):T[]
}

// 把T的作用域限定在类型别名中，ts则要求使用其时显式绑定类型
type Filter1<T>={  //类型别名中只有这一个地方可以声明泛型
    (array:T[],f:(item :T[])=>void):T[]
}

