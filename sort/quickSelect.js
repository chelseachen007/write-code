let array = require("./array.json");

const findKthLargest = (nums, k) => {
    return quickSelect(nums, 0, nums.length - 1, k);
};

const quickSelect = (nums, lo, hi, k) => {
    // 避免最坏情况发生
    const p = Math.floor(Math.random() * (hi - lo + 1)) + lo;
    swap(nums, p, hi);
    // i 作为比temp小的挡板
    // j 作为移动挡板
    let i = lo;
    let j = lo;

    while (j < hi) {
        if (nums[j] <= nums[hi]) {
            swap(nums, i++, j);
        }
        j++;
    }
    swap(nums, i, j);
    // 完成  i 左边都比temp小
    // 第 K大也是就 第 hi - k 小 
    // pivot 是我们要找的 Top k
    if (hi - k === i - 1) return nums[i];
    // Top k 在右边
    if (hi - k > i - 1) return quickSelect(nums, i + 1, hi, k);
    // Top k 在左边
    //k= 寻找 去除已标记的i
    return quickSelect(nums, lo, i - 1, k - (hi - i + 1));
};

const swap = (nums, i, j) => ([nums[i], nums[j]] = [nums[j], nums[i]]);
const newAr = [2, 1, 3, 5, 4, 6, 8, 9, 7]
console.log(findKthLargest(newAr, 1))
// console.time('quickSelect')
// findKthLargest(array, 10)
// console.timeEnd('quickSelect')

/* ****************************** */

// const quickSelect = function (nums, left, right, k) {
//     // 避免最坏情况发生
//     const p = Math.floor(Math.random() * (right - left + 1)) + left;
//     swap(nums, p, right);
//     // i 作为比temp小的挡板
//     // j 作为移动挡板
//     let i = left;
//     let j = left;
//     while (j < right) {
//         if (nums[j] > nums[right]) {
//             swap(nums, i, j)
//             i++
//         }
//         j++
//     }
//     swap(nums, i, j)
//     console.log(nums)
//     if (k === (i - 1)) return nums[i - 1]
//     // K在右边 
//     if (k > (i - 1)) return quickSelect(nums, i + 1, right, k - i + 1)
//     return quickSelect(nums, left, i - 1, k)
// }
