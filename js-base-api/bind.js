
//实现原理:
//返回一个可以传参的函数
//通过构造函数继承 实现new之后 this丢失问题


Function.prototype.mybind = function (context) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fNOP = function () { };
  var fbound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fbound.prototype = this.prototype;`，已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。
    // 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
    self.apply(this instanceof self ? this : context, args.concat(bindArgs));
  }

  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值
  fNOP.prototype = this.prototype;
  fbound.prototype = new fNOP();
  return fbound;
}

var value = 2;

var foo = {
  value: 1
};

function bar (name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.mybind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
