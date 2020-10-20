/*
 * @Descripttion: 
 * @version: 
 * @Author: Chen
 * @Date: 2020-03-21 17:20:55
 * @LastEditors: Chen
 * @LastEditTime: 2020-04-13 16:44:27
 */
var count = 1;
var container = document.getElementById('container');

function getUserAction () {
  container.innerHTML = count++;
};

//不绑定this 会指向window
//需要传参
function debounce (func, wait, immediate = true) {

  var timeout, result;

  let debounced = function () {
    var context = this;
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
    return result;
  }
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}
container.onmousemove = debounce(getUserAction, 1000);


// function debounce (func, wait) {
//   let timer
//   return function () {
//     clearInterval(timer)
//     timer = setTimeout(() => {
//       func.apply(this, arguments)
//     }, wait);
//   }
// }

function debounce (func, wait, immediate = true) {
  let timer, result
  return function () {
    let context = this
    if (timer) clearInterval(timer)
    if (immediate) {
      let callNow = !timeout
      timer = setTimeout(() => {
        timer = null
      })
      if (callNow) result = func.apply(context, arguments)
    } else {
      timer = setTimeout(() => {
        func.apply(context, arguments)
      }, wait);
    }
    return result
  }
}