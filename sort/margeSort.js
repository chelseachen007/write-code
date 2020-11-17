// 融合两个有序数组，这里实际上是将数组 arr 分为两个数组
function mergeArray (arr, first, mid, last, temp) {
    let i = first;
    let m = mid;
    let j = mid + 1;
    let n = last;
    let k = 0;
    while (i <= m && j <= n) {
        if (arr[i] < arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    while (i <= m) {
        temp[k++] = arr[i++];
    }
    while (j <= n) {
        temp[k++] = arr[j++];
    }
    for (let l = 0; l < k; l++) {
        arr[first + l] = temp[l];
    }
    return arr;
}
// 递归实现归并排序
function mergeSort (arr, first, last, temp) {
    if (first < last) {
        let mid = Math.floor((first + last) / 2);
        mergeSort(arr, first, mid, temp);    // 左子数组有序
        mergeSort(arr, mid + 1, last, temp);   // 右子数组有序
        arr = mergeArray(arr, first, mid, last, temp);
    }
    return arr;
}


let array = require("./array.json");
console.time("mergeSort");
mergeSort(array, 0, array.length - 1, []);
console.timeEnd("mergeSort");
// console.log(newArr)