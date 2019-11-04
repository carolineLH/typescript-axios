# typescript-axios

用typescript实现axios学习

一、 typescript学习：
  基础类型
  变量声明（var  let  const）
  变量声明解构
  变量声明展开

  接口（可选属性、只读属性、函数类型、可索引类型）
  接口（类类型、继承接口、混合类型、接口继承类）
  类（继承、公共私有保护修饰符、存储器、静态属性、抽象类）
  函数（函数类型、可选参数和默认参数）
  泛型（泛型类、泛型约束）
  类型推断
  高级类型

二、 项目初始化：
  TypeScript library starter
  它是一个开源的 TypeScript 开发基础库的脚手架工具，可以帮助我们快速初始化一个 TypeScript 项目，我们可以去它的[官网](https://github.com/alexjoverm/typescript-library-starter)地址学习和使用它。

三、 功能实现：

  1、处理url请求参数（包括buildURL函数实现）

  2、处理请求body数据

  3、处理请求header

  4、处理响应数据（包括响应处理响应header、处理响应data）

  5、错误处理（网络错误、超时错误等等）

  6、拦截器实现

  7、配置化实现

  8、取消功能实现

  9、更多功能（包括：CSRF、withCredential、xsrfCookieName、xsrfHeaderName、自定义参数解析规则）

四、axios相关

1、 Content-Type默认为：application/json;charset=utf-8

2、对于data中所传递参数为复杂对象的时候，使用深度递归遍历，将参数扁平化

