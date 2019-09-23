## typescript
* 是javascript的增强，添加了可选择类型标注，提供不断发展javaScript特性
* 未来前端开发趋势
* 技术转型的趋势
* 提升个人能力和竞争力

#### 本课程做什么？
使用typescript从零实现一个axios库
#### 本课程内容
typescript基础知识、ts-axios开发实战
单元测试&发布

## 安装typescript
npm install -g typescript

## 编写第一个typescript程序
#### 基础类型
greeter.ts:
```
function greeter(person: string) {
  return 'Hello ' + person
}

let user = 'caroline'

console.log(greeter(user))
```
输入tsc greeter.ts编译之后生成greeter.js文件：
```
function greeter(person) {
    return 'Hello ' + person;
}
var user = 'caroline';
console.log(greeter(user));

```
用 node greeter.js得到Hello caroline结果。

###### 类型不用驼峰写，小写就好了。写类型的作用是，当我们所传入的参数类型和所定义的参数类型不一致时，编译会报错。函数定义好了，参数个数传错了编译也会报错。

#### 接口类型
看下面例子：
greeter.ts:
```
interface Person {
  firstName: string
  lastName: string
}
function greeter(person: Person) {
  return person.firstName + ' ' + person.lastName
}

let user = {
  firstName: 'caroline',
  lastName: 'liao'
}

console.log(greeter(user))
```
写接口的时候，interface后面的名字一般首字母大写

tsc greeter.ts编译之后生成greeter.js文件如下：
```
function greeter(person) {
    return person.firstName + ' ' + person.lastName;
}
var user = {
    firstName: 'caroline',
    lastName: 'liao'
};
console.log(greeter(user));
```
可见整个接口都被编译掉了，let定义的实参也变成了var定义

#### class类型
greeter.ts:
```
class User {
  fullName: string
  firstName: string
  lastName: string
  constructor(firstName: string,lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.fullName = firstName + lastName
  }
}
interface Person {
  firstName: string
  lastName: string
}
function greeter(person: Person) {
  return person.firstName + ' ' + person.lastName
}

let user = new User('liao', 'caroline')

console.log(greeter(user))

```
class后面的名字首字母也推荐大写

这里User类其实也实现了Person接口的作用。

tsc greeter.js编译之后生成的greeter.js文件如下：
```
var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + lastName;
    }
    return User;
}());
function greeter(person) {
    return person.firstName + ' ' + person.lastName;
}
var user = new User('liao', 'caroline');
console.log(greeter(user));
```
其实类User用函数的方式实现了一个类

node greeter.js可得到 liao caroline
