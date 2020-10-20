// 不允许：await 出现在了箭头函数中
function foo () {
  const syncFn = () => {
    return await Promise.resolve('foo');
  };
  console.log(syncFn());
}
// 不允许：await 出现在了同步函数声明中
function bar () {
  function syncFn () {
    return await Promise.resolve('bar');
  }
  console.log(syncFn());
}
// 不允许：await 出现在了同步函数表达式中
function baz () {
  const syncFn = function () {
    return await Promise.resolve('baz');
  };
  console.log(syncFn());
}
// 不允许：IIFE 使用同步函数表达式或箭头函数
function qux () {
  (function () { console.log(await Promise.resolve('qux')); })();
  (() => console.log(await Promise.resolve('qux')))();
} 