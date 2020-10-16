let p1 = new Promise((resolve, reject) => {
  console.log('p1 executor');
  setTimeout(resolve, 1000);
});
p1.then(() => new Promise((resolve, reject) => {
  console.log('p2 executor');
  setTimeout(resolve, 1000);
}))
  .then(() => new Promise((resolve, reject) => {
    console.log('p3 executor');
    setTimeout(resolve, 1000);
  }))
  .then(() => new Promise((resolve, reject) => {
    console.log('p4 executor');
    setTimeout(resolve, 1000);
  }));
// p1 executor（1 秒后）
// p2 executor（2 秒后）
// p3 executor（3 秒后）
// p4 executor（4 秒后）


// 工厂函数生成
function delayedResolve (str) {
  return new Promise((resolve, reject) => {
    console.log(str);
    setTimeout(resolve, 1000);
  });
}
delayedResolve('p1 executor')
  .then(() => delayedResolve('p2 executor'))
  .then(() => delayedResolve('p3 executor'))
  .then(() => delayedResolve('p4 executor'))
// p1 executor（1 秒后）
// p2 executor（2 秒后）
// p3 executor（3 秒后）
// p4 executor（4 秒后）