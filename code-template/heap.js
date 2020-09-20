// let arr = [1, 2, 3, 4, 5, 6, 7, 9, 10, 12, 15, 18];
let arr = [1, 5, 7, 2, 3, 4, 10, 6, 8, 16];

function buildHeap(arr, n) {
  for (let i = n / 2; i >= 1; --i) {
    heapify(arr, n, i);
  }
  console.log(arr);
}

function heapify(arr, n, i) {
  while (true) {
    let maxPos = i;
    if (i * 2 <= n && arr[i] < arr[i * 2]) maxPos = i * 2;
    if (i * 2 + 1 <= n && arr[maxPos] < arr[i * 2 + 1]) maxPos = i * 2 + 1;
    if (maxPos == i) break;
    [arr[i], arr[maxPos]] = [arr[(maxPos, arr[i])]];
    i = maxPos;
  }
}

// n表示数据的个数，数组a中的数据从下标1到n的位置。
function sort(arr, n) {
  buildHeap(arr, n);
  let k = n;
  while (k > 1) {
    [arr[1], arr[k]] = [arr[(k, arr[1])]];
    --k;
    heapify(arr, k, 1);
  }
  console.log(arr);
}
buildHeap(arr, 2);
sort(arr, 2);
