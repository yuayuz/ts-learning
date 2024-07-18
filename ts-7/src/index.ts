// 返回 null ----不利于程序编写，每次都要检查结果是否为 null ，不利于嵌套和串联操作
function parse(birthday:string):Date|null{
    let date= new Date(birthday)
    if(!isValid(date)){
        return null
    }
    return date
}

function isValid(date:Date){
    return Object.prototype.toString.call(date) === '[object Date]'
        &&!Number.isNaN(date.getTime())
}

let date =parse("asd")
if (date){
    console.log("Date is: " + date.toLocaleDateString())
}else {
    console.log("Error parsing date for some reason")
}
//Error parsing date for some reason


// 抛出异常---并没有处理相应异常

function parse1(birthday:string):Date{
    let date= new Date(birthday)
    if(!isValid(date)){
        throw new RangeError('Enter a date in the form YYYY/MM/DD')
    }
    return date
}
try {
    let date1=parse1("2000")
    console.log("Date is: " + date1.toLocaleDateString())
}catch(e){
    console.error(e)
}
//Date is: 2000/1/1

// 返回异常--- ts 不支持 throws 子句 p197
function parse2(birthday:string):Date|RangeError{
    let date= new Date(birthday)
    if(!isValid(date)){
        return  new RangeError('Enter a date in the form YYYY/MM/DD')
    }
    return date
}

let date2=parse2("asd")
if(date2 instanceof RangeError){
    console.error(date2.message)
}else {
    console.log("Date is: " + date2.toLocaleDateString())
}
//Enter a date in the form YYYY/MM/DD



// ??? Option 类型--专门描述异常的数据类型

function parse3(birthday:string):Date[]{
    let date= new Date(birthday)
    if(!isValid(date)){
        return []
    }
    return [date]
}

let date3=parse3("2001/1/1")
date3.map(_=>_.toLocaleDateString())
    .forEach(_=>console.log("Date is",_))
//Date is 2001/1/1