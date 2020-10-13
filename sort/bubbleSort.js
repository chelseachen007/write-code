// 冒泡排序
// O(n^2)
import array from "./array";
//基础版
function bubbleSort (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] <= arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}

// 进阶版
function HighBubbleSort (arr) {
  let flag = true;
  for (let i = 0; i < arr.length && flag; i++) {
    flag = false;
    for (let j = arr.length - 1; j >= i; j--) {
      if (arr[i] < arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        flag = true;
      }
    }
  }
  return arr;
}

console.time("bubbleSort");
bubbleSort(array);
console.timeEnd("bubbleSort");

console.time("HighBubbleSort");
HighBubbleSort(array);
console.timeEnd("HighBubbleSort");

