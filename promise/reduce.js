function delay (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, time);
    console.log(time);
  });
}

// delay(100) // 步骤1
//     .then(function STEP2() {
//         console.log("step 2 (after 100ms)");
//         return delay(200);
//     }).then(function STEP3() {
//         console.log("step 3 (after another 200ms)");
//     }).then(function STEP4() {
//         console.log("step 4 (next Job)");
//         return delay(50);
//     }).then(function STEP5() {
//         console.log("step 5 (after another 50ms)");
//     })

[1, 2, 3, 4, 5].reduce(async (lastPromise, i) => {
  try {
    await lastPromise;
    return new Promise((res) => {
      setTimeout(() => {
        console.log(i);
        res();
      }, 1000 + 500 * i);
    });
  } catch (e) {
    console.error(e);
  }
}, Promise.resolve(0));