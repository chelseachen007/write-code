let array = require("./array.json");
function insertSort(arr) {
  for (var i = 1; i < arr.length; i++) {
    let preIndex = i - 1;
    let current = arr[i];
    // 若大于current 则右移一位
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    //将值替换到下标点
    arr[preIndex + 1] = current;
  }
  return arr;
}

console.time("insertSort");
insertSort(array);
console.timeEnd("insertSort");
