/*
 * @Descripttion: 
 * @version: 
 * @Author: Chen
 * @Date: 2020-03-21 18:56:02
 * @LastEditors: Chen
 * @LastEditTime: 2020-03-21 19:49:45
 */
//var foo = {
//     value: 1,
//     bar: function() {
//         console.log(this.value)
//     }
// };
// 实现原理 在对象内部添加一个函数 执行参数 然后删除
Function.prototype.mycall = function (context) {
    context.fn = this
    var args = [...arguments].slice(1)
    let result = context.fn(...args)
    delete context.fn

    return result
}


Function.prototype.myapply = function (context) {
    var context = Object(context) || window;
    context.fn = this
    let result = context.fn(arguments[1])
    delete context.fn
    return result
}

// // 测试一下
// var foo = {
//     value: 1
// };

// function bar(name, age) {
//     console.log(name)
//     console.log(age)
//     console.log(this.value);
// }

// bar.myapply(foo, 'kevin', 18);


//实现原理:
//返回一个可以传参的函数
//通过构造函数继承 实现new之后 this丢失问题
Function.prototype.mybind = function (context) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    let self = this
    // let args = Array.prototype.slice.call(arguments, 1);
    let args = [].shift.call(arguments);

    var fNOP = function () {};
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound
}


var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin