Promise.any = (ps) =>
  new Promise((resolve, reject) => {
    let cnt = 0;
    ps.map((p) =>
      p.then(resolve).catch((err) => ++cnt === ps.length && reject(err))
    );
  });

const resolveTimer = (ms) =>
  new Promise((r) => setTimeout(() => r(`${ms}$ elapsed`), ms));
const rejectTimer = (ms) =>
  new Promise((_, r) => setTimeout(() => r(`${ms}$elapse`), ms));
//   const timer = (ms) => (_, r) => setTimeout(() => r(`${ms}$elapse`), ms);
Promise.any([
  resolveTimer(1000),
  resolveTimer(2000),
  resolveTimer(3000),
]).then(console.log);
Promise.any([
  rejectTimer(1000),
  resolveTimer(2000),
  resolveTimer(3000),
]).then(console.log);
Promise.any([rejectTimer(1000), rejectTimer(2000), rejectTimer(3000)])
  .then(console.log)
  .catch(console.log);