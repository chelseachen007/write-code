let array = require("./array.json");
// let array = [1, 3, 4, 86, 7, 745, 9751, 78];

function selectSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

console.time("selectSort");
selectSort(array);
console.timeEnd("selectSort");
