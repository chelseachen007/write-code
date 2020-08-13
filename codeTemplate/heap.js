let arr = [1, , 2, 3, 4, 5, 6, 7, 9, 10, 12, 15, 18];

function buildHeap(a, n) {
  for (let i = n / 2; i >= 1; --i) {
    heapify(a, n, i);
  }
  console.log(a);
}

function heapify(a, n, i) {
  while (true) {
    let maxPos = i;
    if (i * 2 <= n && a[i] < a[i * 2]) maxPos = i * 2;
    if (i * 2 + 1 <= n && a[maxPos] < a[i * 2 + 1]) maxPos = i * 2 + 1;
    if (maxPos == i) break;
    [arr[i], arr[maxPos]] = [arr[(maxPos, arr[i])]];
    i = maxPos;
  }
}

buildHeap(arr, 2);
