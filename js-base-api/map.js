// 接受三个参数的函数
// 返回一个数组
Array.prototype.myMap = function (func) {
  const newArr = []
  const arr = this
  for (let i = 0; i < arr.length; i++) {
    newArr.push(func.call(this, arr[i], i, arr))
  }
  return newArr
}

var arr = ["a", "b", "c", "d", "e"];
const newArr = arr.myMap(function (currentValue, index, arr) {
  console.log("当前元素" + currentValue)
  console.log("当前索引" + index)
  console.log("数组对象" + arr)
  return index
})

console.log(newArr)