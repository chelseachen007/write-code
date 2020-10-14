// 接受一个函数数组
// 返回一个函数
// 函数内部将下一个函数作为参数 

function compose (middlewares) {
  return () => {
    return dispatch(0)
  }

  function dispatch (i) {
    let fn = middlewares[i]
    // if (!fn) return Promise.resolve()
    return fn(() => Promise.resolve(dispatch(i + 1)))
  }
}



async function fn1 (next) {
  console.log("fn1");
  await next();
  console.log("end fn1");
}

async function fn2 (next) {
  console.log("fn2");
  await delay();
  await next();
  console.log("end fn2");
}

function fn3 (next) {
  console.log("fn3");
}

function delay () {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove();
    }, 2000);
  });
}
//fn1
// fn2
// fn3
// end fn2
// end fn1

const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
finalFn();

