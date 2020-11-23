let array = require("./array.json");

function quickSort (arr, begin = 0, end = arr.length - 1) {
    //递归出口
    if (begin >= end)
        return;
    var l = begin; // 左指针
    var r = end; //右指针
    // 尽量避免最差情况
    const p = Math.floor(Math.random() * (end - begin + 1)) + begin;
    swap(arr, p, begin)

    var temp = arr[begin]; //基准数，这里取数组第一个数

    //左右指针相遇的时候退出扫描循环
    while (l < r) {
        //右指针从右向左扫描，碰到第一个小于基准数的时候停住
        while (l < r && arr[r] >= temp)
            r--;
        //左指针从左向右扫描，碰到第一个大于基准数的时候停住
        while (l < r && arr[l] <= temp)
            l++;
        //交换左右指针所停位置的数
        swap(arr, l, r)

    }
    //最后交换基准数与指针相遇位置的数
    swap(arr, begin, l)
    //递归处理左右数组
    quickSort(arr, begin, l - 1);
    quickSort(arr, l + 1, end);
    return arr
}
const swap = (nums, i, j) => ([nums[i], nums[j]] = [nums[j], nums[i]]);
let arr
console.time("quickSort");
quickSort(array);
console.timeEnd("quickSort");
// console.log(arr)