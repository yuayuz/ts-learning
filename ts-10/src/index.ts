// 在最底层，函数封装行为，对象和列表等数据结构封装数据
// 函数和数据可以放在类中，还可以把数据放在单独的数据库或者数据存储器中，
// 把函数和数据放入独立的命名空间中
// 一个类或一系列实用函数放在一个文件中。再上一层，把多个类或者多组实用函数组织在一起构建成包，发布在 npm 中

import {foo} from "./a"
// 默认导出
import b from "./b"
// 通配符（*）导入
import * as a from "./a"
import {X} from "./c"
foo()
console.log(typeof a.bar() )

console.log(b())

console.log(X+1)
let x:X={y:"y"}
console.log(x)

// 模块模式与脚本模式
// 多数时候，使用模块模式。在该模式下，使用 import 和 import() 从其他文件引入代码，
// 使用 export 把代码开放给其他文件使用

// 命名空间：namespace 关键字----摈除了文件在文件系统中的目录结构
// 命名空间必须有名称，可以导出函数，变量，类型，接口或者其他命名空间
// namespace 块中没有显时导出的代码为所在块的私有代码