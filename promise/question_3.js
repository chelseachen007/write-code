setTimeout(() => console.log(1))
let p1 = new Promise(resolve => resolve(2))
setTimeout(() => console.log(3))
let p2 = new Promise(resolve => {
    console.log(4)
    resolve(5)
})
p2.then(res => console.log(res))
p1.then(res => console.log(res))