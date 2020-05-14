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

function getUserAction() {
    container.innerHTML = count++;
};

//不绑定this 会指向window
//需要传参
function debounce(func, wait, immediate = true) {

    var timeout, result;

    return function () {
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
}
container.onmousemove = debounce(getUserAction, 1000);

function throttle(func, wait) {
    let time = 0
    let args = arguments
    return function () {
        let date = +new Date()
        let context = this;
        if (date - time > wait) {
            func.apply(context, args)
            time = date
        }
    }
}
//第二种
function throttle(func, wait) {
    let args = arguments
    return function () {
        let timeout = null
        let context = this;

        if (!timeout) {
            timeout = setTimeout(() => {
                func.apply(context, args)
                timeout = null
            }, wait);
        }

    }
}



function throttle(func,wait){
    let args=[...arguments]
    return function (){
        
    }
}