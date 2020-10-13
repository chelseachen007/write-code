function food (name, color, size) {
  this.name = name;
  this.color = color;
  this.size = size;
}

var apple = new food('redApple', 'RED', 'small');

console.log(myInstanceof(apple, food));  // apple 是food 的一个实例对象，所以返回 true

console.log(myInstanceof(apple, Object)); // apple 是一个实例对象，所以返回 true

console.log(myInstanceof(apple, Array)); // apple 不是一个数组对象，所以返回 false


function myInstanceof (left, right) {

  const proto = right.prototype
  while (left.__proto__) {
    if (left.__proto__ === proto) return true
    left.__proto__ = left.__proto__.__proto__
  }
  return false
}