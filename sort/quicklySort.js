let array = require("./array.json");


function partition(arr, low, high) {
  let i = low - 1;
  const pivot = arr[high];
  for (let j = low; j < high; j++) {
    if (arr[i] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

function quickSort(arr, low, high) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

console.time("quickSort");
quickSort(array);
console.timeEnd("quickSort");


function partition(arr, low, high) {

}

function quickSort(arr, low, high) {
   if(low<high){
     let pi = partition(arr,low,high)
   }
}
