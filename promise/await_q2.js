async function foo () {
  console.log(2);
  console.log(await Promise.resolve(3));
  console.log(4);
}
async function bar () {
  console.log(6);
  console.log(await 7);
  console.log(8);
}
console.log(1);
foo();
console.log(5);
bar();
console.log(9);

// 1 
// 2
// 5
// 6
// 9
// 3 
// 4
// 7
// 8

// 我测试使用的node 输出结果是125697834 

// TC39 对 await 后面是期约的情况如何处理做过一次修改。修改后，本例中的 Promise.resolve(3)只会生成一个
//异步任务。因此在新版浏览器中，这个示例的输出结果为 125693478。