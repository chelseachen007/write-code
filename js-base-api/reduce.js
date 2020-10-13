// 接受一个4个参数的函数，接收一个初始值，
//参数	描述
// total	必需。初始值, 或者计算结束后的返回值。
// currentValue	必需。当前元素
// currentIndex	可选。当前元素的索引
// arr	可选。当前元素所属的数组对象。
// 返回一个数组
Array.prototype.myReduce = function (func) {
  const arr = this
  let value
  let i
  if (arguments.length >= 2) {
    value = arguments[1]
    i = 0
  } else {
    value = arr[0]
    i = 1
  }
  for (; i < arr.length; i++) {
    value = func.call(this, value, arr[i], i, arr)
  }
  return value
}

var arr = [1, 2, 3, 4, 5];
const sum = arr.myReduce(function (pre, currentValue, index, arr,) {
  console.log("返回值" + pre)
  console.log("当前元素" + currentValue)
  console.log("当前索引" + index)
  console.log("数组对象" + arr)
  return pre + currentValue
})

console.log(sum)