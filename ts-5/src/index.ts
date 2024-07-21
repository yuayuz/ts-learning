// 类和接口

type Colors = 'Black' | 'White'
type File1 = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8  // 限定类型范围

class Position {
    constructor(
        private file: File1,
        private rank: Rank  //私有
    ) {
    }
}

class piece {
    protected position: Position

    constructor(
        private readonly colors: Colors,   // 只能读取
        file: File1,
        rank: Rank
    ) {
        this.position = new Position(file, rank)
    }
}

// pubic：任何地方都可访问，默认访问级别
// protected:可有当前类及其子类的实例访问
// private:值可有类的实例访问
// abstract：抽象

// super
// super调用父类中的同名方法--方法调用和构造函数调用（只能访问父类的方法，不能访问父类的属性）

// 以this为返回类型
// this：1、用作值；2、用作类型；3、注解方法的返回类型
// 方法需要返回当前类的实例，其子类需要返回子类实例；但显示标注返回实例失去了继承基类的意义
// 解决：使用this注解返回类型

// 接口
// 类型别名和接口算是同一概念的两种句式，两者可以相互赋值
type food1 = {
    name: string
}
type foodT = food1 & {
    T: string
}

interface food2 {
    name: string
}

interface foodI extends food2 {
    I: string
}

// 区别：
// 1、类型别名更加通用，右边可以时任何类型；接口声明中，右边必须为结构
// 扩展接口时，ys将检查扩展的接口是否可赋值给被扩展接口
// 同一作用域中多个同名接口会自动合并（声明合并--1、两个接口不能有冲突；2、泛型要使用为完全相同的方式声明），接口会导致编译时错误

// 实现

// 声明类和四，使用implements知名该类满足某个接口

interface A {
    a: string // 可以声明属性，但是不能带有可见性修饰符，不能使用static；可以使用readonly
    logA(): void
}

class a implements A {
    a = "aaa"

    logA() {  // 必须实现接口中的每一个方法
        console.log("A")
    }
}

let aa = new a()
console.log(aa.a)

// 接口或扩展抽象类
// 如果多各类共用一个实现，使用抽象类；如果需要一种轻量的方法表示“这个类是T性”，使用接口

// 类是结构化类型
// ts根据结构比较类，与类的名称无关；如果常规对象也定义了相同结构，也与类兼容
// 若类中有使用private或者protected修饰的字符，而且结构不是类的类或者子类实例时，结构便不能赋值给类

// 类、枚举即声明类型也声明值
class B {
}

let b: B = new B

// 类会在类型层面，生成代表类的实例和代表类的构造方法（通过typeof实现）
enum C {D, E}

let c: C = C.E

// 多态
class F<K, V> {
    constructor(a: K, b: V) { // 构造方法中不能声明泛型，应该在类声明中声明泛型
        console.log(`first ${a} , second ${b}`)
    }
    log<Z>(a: Z, b: Z) {
        console.log(`log ${a} , ${b}`)
    }
}
let f = new F(1, "string")
f.log([1,2,3],{1:1,2:2,3:3})
// 实例方法可以访问类一级的泛型，也可以自己声明范型

// ！！混入-需要重新理解
// 可以有状态
// 只能提供具体方法
// 可以有构造方法（调用顺序与混入类的顺序一致）

// 装饰器--在装饰目标上调用函数的一种句法
// ts没有内置任何装饰器，只能自己实现或者npm安装

// ts不支持final，可模拟

// 工厂模式-创建某种类型对象的一种方式，把创建那种类型交给创建该对象的工厂决定

type Shoe={
    purpose:string
}

class BalletFlat implements Shoe {
    purpose='dancing'
}

class Boot implements Shoe {
    purpose='woodcutting'
}

class Sneaker implements Shoe {
    purpose='walking'
}

let Shoe={
    create(type:'balletFlat'|'boot'|'sneaker'):Shoe{
        switch (type) {
            case "balletFlat":return new BalletFlat()
            case "boot":return new Boot()
            case "sneaker":return new Sneaker()
        }
    }
}
console.log(Shoe.create("boot"))

// 建造者模式--把对象的建造方式与具体的实现方式区分开

class RequestBuilder {
    private  url: string|null=null
    private data:object | null = null
    private method:'get'|'post'|'put'|'delete'|null=null
    // 私有变量，初始值为null
    setMethod (method:'get'|'post'|'put'|'delete'|null):this {
        this.method=method
        return this  // 返回this，RequestBuilder实例
    }

    setData (data:object | null):this {
        this.data=data
        return this
    }
    setURL (url:string):this {
        this.url=url
        return this
    }
}

let request=new RequestBuilder()
.setData({firstname:"John",lastname:"Doe"})
.setURL('/user')
.setMethod('get')

console.log(request)