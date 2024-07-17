/*类型进阶*/

/*类型之间的关系*/
//子类型和超类型
//子类型：B是A的子类型，那在需要A的地方都可以安心使用B
//超类型：A是B的超类型，那在需要A的地方都可以安心适应B

/*型变*/
//B<:A--B是A的子类型或者同种类型
//A>:B--A时B的超类型或者同种类型

/*
* ts对于预期的结构，可以使用属性的类型<:预期类型的结构，
* 但不能传入属性类型是预期类型的超类型的结构
* */
//在类型上，ts对结构（对象和类）的属性类型进行了协变---想保证A对象可以赋值给B对象，那么A对象的每个属性必须<:B对象的对应属性

//！！！！形变的四种方式
//1、不变：只能是T
//2、协变：可以<:T
//3、逆变：可以>：T
//4、双变：可以<:T或者>:T

//协变：对象、类、数组和函数的返回类型
//逆变：函数的参数

/*！！函数：函数不对参数和this的类型作型变，一个函数要是另一个函数的子类型，那么该函数的参数和this>:另一个函数的相应参数类型，
返回类型要<:另一个函数的返回类型*/

/*！可赋值性--A可赋值给B，那么A<:B或者A是any*/

/*类型扩宽*/
//允许以后修改变量的值（let，var），变量的类型将扩宽，从字面量放大到包含该字面量的基类型

/*多余类型检查---ts尝试将一个新鲜对象字面类型T赋值给另一个类型U是，如果T有不在U中的属性，ts将报错*/
//新鲜对象字面类型：ts从对象字面量中推导出的类型

/*？？细化--ts采用基于流的类型推导，这是一种符号执行，类型检查器在检查代码的过程中财力流程语句和类型茶uxn细化类型*/

/*全面性检查（穷尽性检查）--类型检查其所作的一项检查，为了确保所有情况被覆盖了*/

/*对象类型的类型运算符---“键入”*/

type A = {
    B: {
        C: String
    }
}
type D = A['B']['C']
let d: D = "string"
console.log(`d:${d},type:${typeof d}`)
//任何结构和数组都可以“键入”。
//number是“键入”数组类型的方式；元组，使用0、1或其他数字字面量表示向“键入”的索引
//既然可以在对象中查找值，也可以在结构中查找类型---只能使用方括号

/*keyof--获取对象中所有键的类型，合并为一个字符串字面量类型*/
type E = keyof A  //B

/*??????Record--用于描述有映射关系的对象 p166*/

type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
type Day = 'Sat' | 'Sun'
/*let nestDay1:Record<Weekday, Day> = {
    Mon: 'Tue',
}
let nextDay2: {[K in Weekday]:Day}= {
    Mon: 'Tue'
}*/

/*条件类型---声明一个依赖类型U和V的类形T，如果U<:V，把T赋值给A，否则赋值给B*/
type ToArray<T> = T[]
type t1 = ToArray<number> //number[]
type t2 = ToArray<number | string> //(number|string)[]

type ToArray2<T> = T extends unknown ? T[] : T[]
type t3 = ToArray2<number>  //number[]
type t4 = ToArray2<number | string> //number[]|string[]


/*infer关键字--可以在条件中声明泛型*/

type ElementType<T> = T extends unknown[] ? T[number] : T
type et = ElementType<number[]>  //number
//重写为
type ElementType2<T> = T extends (infer U)[] ? U : T
type et2 = ElementType<number[]> //number

/*内置条件类型*/
//Exclude<T,U>--计算在T中不在U中的类新
//Extract<T,U>--计算T中可赋值给U的类型
//NonNullable<T,U>==从T中排除null和undefined
//ReturnType<F>--计算函数的返回类型（不适用泛型和重载函数）

/*系统断言--告诉ts参数是那个类型*/
function log(input: string) {
}

function getInput(): number | string {
    return "log"
}
let input=getInput()
log(input as string);
//等效于
log(<string>input);

/*非空断言--！*/
type Dialog={
    id?:string
}
let dialog:Dialog = {
    id:'string'
}
if(!dialog.id){
    console.log("!!!!")
}else {
    console.log(dialog.id);
}

/*明确赋值断言*/
let id!:string//ts无法通过静态方法知晓id已被赋值--使用明确赋值断言告诉ts，读取id时已经为其赋值
addId()
console.log(id.toUpperCase())
function addId(){
    id="id"
}
