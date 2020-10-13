/*
 * @Descripttion: 
 * @version: 
 * @Author: Chen
 * @Date: 2020-03-21 19:24:52
 * @LastEditors: Chen
 * @LastEditTime: 2020-03-21 19:42:48
 */


if (!Object.create) {
  Object.create = function (o) {
    function F () { }
    F.prototype = o
    return new F();
  }
}
//new 的执行过程，我们再来看一下：
// 以构造器的 prototype 属性（注意与私有字段[[prototype]]的区分）为原型，创建新对象；
// 将 this 和调用参数传给构造器，执行；
// 如果构造器返回的是对象，则返回，否则返回第一步创建的对象。
function myNew () {
  let rest = [].shift.call(arguments);
  // 1.以构造器的prototype属性为原型，创建新对象；
  let child = Object.create(rest.prototype);
  // 2.将this和调用参数传给构造器执行
  let ret = rest.apply(child, arguments);
  // 3.返回第一步的对象
  return ret instanceof Object ? ret : obj;
};


function Otaku (name, age) {
  this.strength = 60;
  this.age = age;

  return {
    name: name,
    habit: 'Games'
  }
}

var person = new Otaku('Kevin', '18');
var myPerson = myNew(Otaku, 'Kevin', '18');
console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined

console.log(myPerson.name) // Kevin
console.log(myPerson.habit) // Games
console.log(myPerson.strength) // undefined
console.log(myPerson.age) // undefined