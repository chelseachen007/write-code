async function foo () {
  console.log('foo')
}
async function bar () {
  console.log('bar start')
  await foo()
  console.log('bar end')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
bar();
new Promise(function (resolve) {
  console.log('promise executor')
  resolve();
}).then(function () {
  console.log('promise then')
})
console.log('script end')


/*
回答
script start
bar start
foo
promise executor
script end

bar end
promise then

setTimeout
*/

//两个微任务错了
//在 node 11 版本中，node 下 Event Loop 已经与浏览器趋于相同
// node和浏览器的eventloop区别
/*
浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。
而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务。
 */