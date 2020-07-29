function Promise(excutro) {
  let self = this;
  self.onResolved = [];
  self.onReject = [];
  self.stauts = "pedding";

  function resolve(value) {
    if (self.stauts === "pedding") {
      self.stauts = "resolved";
      self.value = value;
      self.onResolved.forEach((fn) => fn(value));
    }
  }

  function reject(reson) {
    if (self.stauts === "pedding") {
      self.stauts = "reject";
      self.reson = reson;
      self.onResolved.forEach((fn) => fn(value));
    }
  }
  excutro(resolve, reject);
}
Promise.prototype.then = function (resolved, rejected) {
  let self = this;
  let promise2;
  resolved = typeof resolved === "function" ? resolved : (val) => val;
  if (self.stauts === "resolved") {
    return (promise2 = new Promise((resolve, reject) => {
      try {
        x = resolved(self.value);
        if (x instanceof Promise) {
          x = x.then;
        }
        resolve(x);
      } catch (e) {
        reject(e);
      }
    }));
  }
  if (self.stauts === "pedding") {
    return (promise2 = new Promise((resolve, reject) => {
      try {
        self.onResolved.push(function () {
          try {
            x = resolved(self.value);
            if (x instanceof Promise) x = x.then(resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } catch (e) {
        reject(e);
      }
    }));
  }
};
Promise.prototype.race = function (promiseArr) {
  return new MyPromise((resolve, reject) => {
    //同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
    for (let p of promiseArr) {
      MyPromise.resolve(p).then(
        //Promise.resolve(p)用于处理传入值不为Promise的情况
        (value) => {
          resolve(value);
        }, //注意这个resolve是上边new MyPromise的
        (err) => {
          reject(err);
        }
      );
    }
  });
};
Promise.prototype.all = function (promiseArr) {
  let index = 0;
  let result = [];
  return new MyPromise((resolve, reject) => {
    promiseArr.forEach((p, i) => {
      //Promise.resolve(p)用于处理传入值不为Promise的情况
      MyPromise.resolve(p).then(
        (val) => {
          index++;
          result[i] = val; //所有then执行后, resolve结果
          if (index === promiseArr.length) {
            resolve(result);
          }
        },
        (err) => { reject(err);} //有一个Promise被reject时，MyPromise的状态变为reject 
      );
    });
  });
};
