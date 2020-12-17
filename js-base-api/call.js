// 实现原理 在对象内部添加一个函数 执行参数 然后删除
Function.prototype.myCall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }
    context.fn = this
    const arg = [...arguments].slice(1)
    const result = context.fn(...arg)
    delete context.fn
    return result

}
// 测试一下
var foo = {
    value: 1
};

function bar (name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.myCall(foo, 'kevin', 18);

function mybind (fn) {
    fn.fn = this
    const arg = [...arguments].slice(1)
    let result = fn.fn(...arg)
    delete fn.fn
    return result
}