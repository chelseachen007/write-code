// 实现sum函数使得下面输出结果一致/
// sum(1,2,3).sumOf() //6
// sum(2,3)(1).sumOf() //6
// sum(2)(1)(3).sumOf() //6

function add(a, b) {
  return a + b;
}
// function sum(...args) {
//   let count = 0;
//   console.log(args);
//   if (args.length <= 1) return (args = 0, count) => args + count;
//   return () => args.reduce((pre, v) => pre + v, count);
// }

// let sum = curry(add);
// sum.prototype.sumOf = function () {
//   console.log(this);
// };
function Sum(arg) {
  if (!(this instanceof Sum)) return new Sum(arg);
  this.arr = [];
  return (reply = () => {
    let arg = [...arguments];
    console.log(this.arr);
    this.arr = this.arr.concat(arg);
    if (arg.length == 0) {
      return arr.reduce((p, c) => (p = add(p, c)), 0);
    } else {
      return reply;
    }
  });
}
Sum.prototype.curry = function (add) {
  let arr = [];
};
console.log(Sum(1, 2, 3)());
console.log(Sum(2, 3)(1)());
// sum(1, 2, 3).sumOf();
// sum(2, 3)(1).sumOf();
// sum(2)(1)(3).sumOf();
