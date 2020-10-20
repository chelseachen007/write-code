async function randomDelay (id) {
  // 延迟 0~1000 毫秒
  const delay = Math.random() * 1000;
  return new Promise((resolve) => setTimeout(() => {
    console.log(`${id} finished`);
    resolve();
  }, delay));
}


/* 
正常串行写法
*/
async function foo1 () {
  const t0 = Date.now();
  await randomDelay(0);
  await randomDelay(1);
  await randomDelay(2);
  await randomDelay(3);
  await randomDelay(4);
  console.log(`${Date.now() - t0}ms elapsed`);
}
foo1();

// 0 finished
// 1 finished
// 2 finished
// 3 finished
// 4 finished
// 1570ms elapsed

/* 
for循环写法
*/
async function foo2 () {
  const t0 = Date.now();
  for (let i = 0; i < 5; ++i) {
    await randomDelay(i);
  }
  console.log(`${Date.now() - t0}ms elapsed`);
}
// foo2();

// 0 finished
// 1 finished
// 2 finished
// 3 finished
// 4 finished
// 2494ms elapsed

/* 
不保证顺序，但是并发执行了
*/
async function foo3 () {
  const t0 = Date.now();
  const promises = Array(5).fill(null).map((_, i) => randomDelay(i));
  for (const p of promises) {
    await p;
  }
  console.log(`${Date.now() - t0}ms elapsed`);
}
// foo3();

// 2 finished
// 4 finished
// 3 finished
// 0 finished
// 1 finished
// 999ms elapsed


/* 
虽然Promise没有按照顺序执行，但 await 按顺序收到了每个Promise的值：
*/
async function foo4 () {
  const t0 = Date.now();
  const promises = Array(5).fill(null).map((_, i) => randomDelay(i));
  for (const p of promises) {
    console.log(`awaited ${await p}`);
  }
  console.log(`${Date.now() - t0}ms elapsed`);
}
// foo4();

// 1 finished
// 3 finished
// 0 finished
// awaited 0
// awaited 1
// 2 finished
// awaited 2
// awaited 3
// 4 finished
// awaited 4
// 958ms elapsed


