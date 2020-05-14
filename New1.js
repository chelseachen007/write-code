/*
 * @Descripttion: 
 * @version: 
 * @Author: Chen
 * @Date: 2020-04-16 10:04:02
 * @LastEditors: Chen
 * @LastEditTime: 2020-04-16 10:08:19
 */
if (!Object.create) {
    Object.create = fucntion(o) {
        function F() {}
        F.prototype = o
        new F()
    }
}

function myNew(obj, ...rest) {
    let newObj = Object.create(obj.prototype)
    newObj.apply(obj,rest)
    return newObj
}