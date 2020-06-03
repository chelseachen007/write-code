var count = 1;
var container = document.getElementById("container");

function getUserAction() {
  container.innerHTML = count++;
}

// container.onmousemove = getUserAction;
// 第一版
// function throttle(func, wait) {
//   var context, args;
//   var previous = 0;

//   return function () {
//     var now = +new Date();
//     context = this;
//     args = arguments;
//     if (now - previous > wait) {
//       func.apply(context, args);
//       previous = now;
//     }
//   };
// }
// function throttle(func, wait) {
//   var context, args;
//   var timeout;
//   var throttled = function () {
//     context = this;
//     args = arguments;

//     if (!timeout) {
//       timeout = setTimeout(() => {
//         func.apply(context, args);
//         timeout = null;
//       }, wait);
//     }
//   };
//   return throttled;
// }
function throttle(func, wait) {
  var context, args, timeout;
  var previous = 0;
  var throttled = function () {
    var now = +new Date();
    context = this;
    args = arguments;
    function later() {
      previous = +new Date();
      timeout = null;
    }
    //还有多少剩余时间
    let newDate = wait - (now - previous);

    if (newDate < 0 || newDate > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, wait);
    }
  };
  return throttled;
}
container.onmousemove = throttle(getUserAction, 1000);
