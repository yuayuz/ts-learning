// 在一个线程中多路复用状态，而其他任务则处于空闲状态。这中事件循环是js引擎的标准线程模型
// js采用事件循环式并发模型

// js异步程序的核心基础是回调
//异步代码调用的回调也是函数，而且类型签名中没有标明函数是异步调用的

// promise---new Promise接受一个函数（执行器），在Promise的实现中，执行器接受两个参数--resolve和reject函数

// async和await
// await可以时作.then在语言层面上的句法糖。使用await处理Promise对象时，要把相关代码放在async块中。
// 这种情况不再使用.catch，而是把await放在常规的try/catch块中。

// 事件发射器--事件发射器提供的API用于在通道中发射事件，并监听该通道中的事件

interface Emitter{
    // 发射事件
    emit(channel:string,value:unknown): void;
    // 发射事件后做些事情
    on(channel:string,value:unknown): void;
}

