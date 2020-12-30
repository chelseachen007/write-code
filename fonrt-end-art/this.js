let a = {
    value: 1,
    func1 () {
        console.log(this.value)
    },
    func2: () => {
        console.log(this)
        console.log(this.value)
    }
}
let b = {
    ...a,
    value: 2
}
let value = 3

b.func1()
b.func2()

a.func1()
a.func2()