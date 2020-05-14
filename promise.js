function Promise(excutro) {
    let self = this
    self.onResolved = []
    self.onReject = []
    self.stauts = 'pedding'

    function resolve(value) {
        if (self.stauts === 'pedding') {
            self.stauts = 'resolved'
            self.value = value
            self.onResolved.forEach(fn => fn(value));
        }
    }

    function reject(reson) {
        if (self.stauts === 'pedding') {
            self.stauts = 'reject'
            self.reson = reson
            self.onResolved.forEach(fn => fn(value));
        }
    }
    excutro(resolve, reject)
}
Promise.prototype.then = function (resolved, rejected) {
    let self = this
    let promise2
    resolved = typeof resolved === 'function' ? resolved : val => val
    if (self.stauts === 'resolved') {
        return promise2 = new Promise((resolve, reject) => {
            try {
                x = resolved(self.value)
                if (x instanceof Promise) {
                    x = x.then
                }
                resolve(x)
            } catch (e) {
                reject(e)
            }

        })
    }
    if (self.stauts === 'pedding') {
        return promise2 = new Promise((resolve, reject) => {
            try {
                self.onResolved.push(function () {
                    try {
                        x = resolved(self.value)
                        if (x instanceof Promise) {
                            x = x.then(resolve, reject)
                        }
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