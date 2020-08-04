/*
 * @Descripttion: 
 * @version: 
 * @Author: Chen
 * @Date: 2020-03-22 11:33:21
 * @LastEditors: Chen
 * @LastEditTime: 2020-03-22 12:58:43
 */
function Tools(obj) {
    if (!(this instanceof Tools)) return new Tools(obj);
    this.option = obj
    this._wrapped = obj
    return this
}
Tools.do = function (option) {
    console.log(this.option, 'do');
    return this
}
Tools.setOption = function (option) {
    this.option = option
    console.log(this.option, 'setOption');
    return this
}
Tools.save = function (option) {
    this.option = option
    console.log(this.option, 'save');
    return Promise.resolve(this)
}
Tools.prototype.push = function (num) {
    this._wrapped.push(num);
    return Tools(this._wrapped)
    // return  Tools(this._wrapped)
}

Tools.prototype.shift = function (num) {
    this._wrapped.shift()
    return Tools(this._wrapped)
}
Tools.prototype.do = function (option) {
    console.log(this.option, 'do');
    return this
}
Tools.prototype.setOption = function (option) {
    this.option = option
    console.log(this.option, 'setOption');
    return chainResult(this, this._wrapped)

}
console.log(Tools([1, 2, 3]).push(4).shift());

console.log(Tools('1'));
console.log(Tools('2').do());
Tools.setOption('3').do()
Tools.save('4').then(() => {
    console.log('then');
})