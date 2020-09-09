async function async1 () {
  console.log('async1 start');
  setTimeout(() => {
    console.log('timer1 start');
  }, 500);
  Promise.resolve().then((res) => {
    console.log('promise1');
  })
  await async2();
  setTimeout(() => {
    console.log('timer1 end');
  }, 500);
  console.log('async1 end');
}

async function async2 () {
  setTimeout(() => {
    console.log('timer2');
  }, 1000);
  Promise.resolve().then((res) => {
    console.log('promise2');
  })
  console.log('async2');
}

async1();

console.log('start');

/* 顺序：
async1 start
async2
start
promise1
promise2
async1 end
timer1  start
timer1 end
timer2
*/