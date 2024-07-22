// 在一个线程中多路复用状态，而其他任务则处于空闲状态。这中事件循环是 js 引擎的标准线程模型
// js 采用事件循环式并发模型

setTimeout(()=>console.log("A"),1)
setTimeout(()=>console.log("B"),2)
console.log("C")
//C A B

// js 异步程序的核心基础是回调
// 异步代码调用的回调也是函数，而且类型签名中没有标明函数是异步调用的

/* Promise --- new Promise接受一个函数（执行器），
在 Promise 的实现中，执行器接受两个参数-- resolve 和 reject 函数*/
let p1 = new Promise(resolve => {
    console.log("p1");
    setTimeout(resolve, 1000)
});
p1.then(() => new Promise(resolve => {
    console.log("p2");
    setTimeout(resolve, 1000)
}))
    .then(() => new Promise(resolve => {
        console.log("p3");
        setTimeout(resolve, 1000)
    }))
    .then(() => new Promise(resolve => {
        console.log("p4");
        setTimeout(resolve, 1000)
    }))
console.log("p2、p3、p4在后面打印")
// async 和 await
// await可以时作 .then 在语言层面上的句法糖。使用 await 处理 Promise 对象时，要把相关代码放在 async 块中。
// 这种情况不再使用 .catch，而是把 await 放在常规的 try/catch 块中。
async function a(){
    await new Promise(resolve => setTimeout(resolve,1000))
        .then(()=>console.log("hello!!"))
}
console.log("TypeScript,")
a().then(()=>console.log("function a()"))
//async 如果有返回值则返回一个 Promise，返回值期待一个实现 thenable 接口的对象；若存在则将对象提供给 then() 的处理程序“解包”
//await 期待一个实现 thenable 接口i的对象，这个对象可由 await 解包


// 事件发射器--事件发射器提供的 API 用于在通道中发射事件，并监听该通道中的事件

interface Emitter{
    // 发射事件
    emit(channel:string,value:unknown): void;
    // 发射事件后做些事情
    on(channel:string,value:unknown): void;
}

/*
运行结果：
C
p1
p2、p3、p4在后面打印
TypeScript,
A
B
p2
hello!!
function a()
p3
p4
*/
