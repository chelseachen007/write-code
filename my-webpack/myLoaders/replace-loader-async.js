// 函数 声明式函数 不可以是箭头函数
// 函数 必须有返回值
// 如何返回多值
// 如何处理异步逻辑
// 如何处理多个自定义loader
module.exports = function (source) {
  //   console.log(this.query);
  //   console.log(source);
  const callback = this.async();
  setTimeout(() => {
    const result = source.replace("老韩", this.query.name);
    callback(null, result);
  }, 2000);
  //   this.callback(null, result);
};
