/*
 * @Descripttion: 
 * @version: 
 * @Author: Chen
 * @Date: 2020-03-21 18:56:02
 * @LastEditors: Chen
 * @LastEditTime: 2020-03-21 19:49:45
 */
// // 接受一个参数
// // 实现原理 在对象内部添加一个函数 执行参数 然后删除
// Function.prototype.myapply = function (context) {
//     context = Object(context) || window;
//     context.fn = this
//     let result = context.fn(...arguments[1])
//     delete context.fn
//     return result
// }

// 测试一下
var foo = {
    value: 1
};
Function.prototype.myapply = function myapply (context) {
    context = Object.create(context)
    context.fn = this
    let result = context.fn(...arguments[1])
    delete context.fn
    return result
}
function bar (name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.myapply(foo, ['kevin', 18]);

if (!Object.create) {
    Object.create = function (o) {
        function fn () { }
        fn.prototype = o
        return new fn()
    }
}
