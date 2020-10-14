

// 测试用例

function Otaku (name, age) {
  this.strength = 60;
  this.age = age;

  // return {
  //   name: name,
  //   habit: 'Games'
  // }
}
var myPerson = myNew(Otaku, 'Kevin', '18');

console.log(myPerson.name) // Kevin
console.log(myPerson.habit) // Games
console.log(myPerson.strength) // undefined
console.log(myPerson.age) // undefined


if (!Object.create) {
  Object.create = function (obj) {
    function Func () { }
    Func.prototype = obj
    return new Func()
  }
}

function myNew () {
  const rest = [].shift.call(arguments)
  const child = Object.create(rest.prototype)
  const obj = rest.apply(child, arguments)
  return obj instanceof Object ? obj : child
}