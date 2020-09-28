var count = 1;
var container = document.getElementById("container");

function getUserAction () {
  container.innerHTML = count++;
}

// function throttle (func, wait) {
//   var context, args, timeout;
//   var previous = 0;
//   var throttled = function () {
//     var now = +new Date();
//     context = this;
//     args = arguments;
//     function later () {
//       previous = +new Date();
//       timeout = null;
//     }
//     //还有多少剩余时间
//     let newDate = wait - (now - previous);

//     if (newDate < 0 || newDate > wait) {
//       if (timeout) {
//         clearTimeout(timeout);
//         timeout = null;
//       }
//       previous = now;
//       func.apply(context, args);
//     } else if (!timeout) {
//       timeout = setTimeout(later, wait);
//     }
//   };
//   return throttled;
// }
container.onmousemove = throttle(getUserAction, 1000);

function throttle (func, wait) {
  let arg, context, timeout
  return function () {
    context = this
    arg = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(context, arg)
        timeout = null
      }, wait)
    }
  }
}


function throttle (func, wait) {
  let arg, context, timeout
  let date = 0
  return function () {
    arg = arguments
    context = this
    let time = new Date()
    if (time - date > wait) {
      func.apply(context, arg)
      date = time
    }
  }
}