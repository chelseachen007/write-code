Promise.all = (arr) => {
  let count = 0
  let result = []
  return new Promise((resolve, reject) => {
    arr.forEach(promise => {
      promise.then(res => {
        count++
        result.push(res)
        if (count == arr.length) {
          resolve(result)
        }
      })
        .catch(err => reject(err))
    });
  })

}


// 测试用例
const resolveTimer = (ms) =>
  new Promise((r) => setTimeout(() => r(`${ms}$ elapsed`), ms));
const rejectTimer = (ms) =>
  new Promise((_, r) => setTimeout(() => r(`${ms}$elapse`), ms));
//   const timer = (ms) => (_, r) => setTimeout(() => r(`${ms}$elapse`), ms);
Promise.all([
  resolveTimer(1000),
  resolveTimer(2000),
  resolveTimer(3000),
]).then(console.log);
Promise.all([
  rejectTimer(1000),
  resolveTimer(2000),
  resolveTimer(3000),
]).then(console.log)
  .catch(console.log)
Promise.all([rejectTimer(1000), rejectTimer(2000), rejectTimer(3000)])
  .then(console.log)
  .catch(console.log);