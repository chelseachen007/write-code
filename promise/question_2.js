console.log('A');

setTimeout(() => {
  console.log('B')
}, 1000);
let date = new Date()
while (new Date - date < 3000) { }

setTimeout(() => {
  console.log('C')
}, 0);
console.log('D')

new Promise((resolve, rejcet) => {
  console.log('E')
  obj.foo(100)
}).then(res => {
  console.log('H')
}).then(res => {
  console.log('F')
}).catch(res => {
  console.log('I')
})

console.log('Z')

//第一次答案
/*
A
D
E
Z
I
B
C
 */
// 完美