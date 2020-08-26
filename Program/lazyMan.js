


class LazyMans {
    constructor(name) {
        this.name = name
        console.log(` Hi I am ${this.name}`)
        this.queen = []
        setTimeout(() => this._next(), 0)
    }
    _next() {
        if (!this.queen.length) return
        this.queen.shift().call(this)
    }
    _sleep(time, isFirst = false) {
        const _sleep = () => setTimeout(() => {
            console.log(`等待了${time}秒...`)
            this._next()
        }, time * 1000)
        isFirst ? this.queen.unshift(_sleep) : this.queen.push(_sleep)
        return this

    }
    sleep(time) {
        return this._sleep(time)
    }
    eat(food) {
        const _eat = () => {
            console.log('I am eating ' + food)
            this._next()
        }
        this.queen.push(_eat)
        return this
    }
    sleepFirst(time) {
        return this._sleep(time, true)
    }
}

let LazyMan = (name) => new LazyMans(name)


//要求设计LazyMan类，实现以下功能
// LazyMan('Tony');
// Hi I am Tony

// LazyMan('Tony').sleep(3).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food