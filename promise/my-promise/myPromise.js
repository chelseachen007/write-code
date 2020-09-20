function myPromise (excuro) {
  const _self = this
  _self.stauts = 'pedding'
  _self.resList = []
  _self.rejList = []
  function resolve (value) {
    _self.stauts = 'resolved'
    _self.value = value
    _self.resList.forEach(fn => fn(value));
  }
  function reject (reason) {
    _self.stauts = 'rejected'
    _self.value = reason
    _self.rejList.forEach(fn => fn(reason));
  }
  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}

myPromise.prototype.then = function (resolved, rejected) {
  const _self = this

  // 穿透
  resolved = typeof resolved === 'function' ? resolved : (val) => val
  rejected = typeof rejected === 'function' ? rejected : (val) => val
  if (_self.stauts === 'resolved') {
    return new myPromise((resolve, reject) => {
      try {
        x = resolved(_self.value)
        if (x instanceof myPromise) x = x.then(resolve, reject);
        resolve(x)
      } catch (e) {
        reject(e)
      }
    })
  }
  if (_self.stauts === 'rejected') {
    return new myPromise((resolve, reject) => {
      try {
        x = rejected(_self.value)
        if (x instanceof myPromise) x = x.then(resolve, reject);
        resolve(x)
      } catch (e) {
        reject(e)
      }
    })
  }
  if (_self.stauts === 'pedding') {
    return new myPromise((resolve, reject) => {
      try {
        _self.resList.push(() => {
          try {
            x = resolved(_self.value)
            if (x instanceof myPromise) x = x.then(resolve, reject);
          } catch (e) {
            reject(e)
          }
        })

        _self.rejList.push(() => {
          try {
            x = rejected(_self.value)
            if (x instanceof myPromise) x = x.then(resolve, reject);
          } catch (e) {
            reject(e)
          }
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}

myPromise.prototype.catch = function (onRejected) {
  const self = this
  return self.then(null, onRejected)
}

//接受一个promise数组
//只要有一个成功就进入then

myPromise.prototype.race = function (promiseArr) {
  return new myPromise((resolve, reject) => {
    for (let p of promiseArr) {
      myPromise.resolve(p).then(res => {
        resolve(res)
      })
        .catch((err) => { reject(err) })
    }
  })

}

myPromise.prototype.all = function (promiseArr) {
  let index = 0
  let result = []
  return new myPromise((resolve, reject) => {
    promiseArr.forEach((p, i) => {
      myPromise.resolve(p).then(res => {
        result.push(res)
        index++
        if (index === promiseArr.lenght) {
          resolve(result)
        }
      }).catch(err => { reject(err) })
    })
  })
}

/*
npm i -g promises-aplus-tests
promises-aplus-tests Promise.js
 */
