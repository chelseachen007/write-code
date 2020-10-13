
var obj = {
  name: "muyiy",
  book: {
    title: "You Don't Know JS",
    price: "45",
    b: {
      name: '小b',
      age: 18,
      next: {
        name: '小二'
      }
    }
  },
  array: [1, 12, [1, 2]],
  a1: undefined,
  a2: null,
  a3: 123,
}
obj.obj = obj
// 数组测试
// const array = [1, 2, 3, 4, [1, 2, 3, [3, 4, 5]]]
// const newArr = deepClone(array)
// newArr[4][3] = 5
// console.log(array, 'array')


// 对象测试
console.time('deepclone')
const newObject = deepClone(obj)
console.timeEnd('deepclone')
newObject.name = 'chelse'
newObject.array[2][0] = 'chelse'
// console.log(obj, 'obj')

function isObject (obj) {
  return obj != null && typeof obj === 'object'
}
// 考虑可以传入数组和对象
// 考虑循环应用
function deepClone (obj, map = new WeakMap()) {
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (isObject(obj)) {
    const cloneObj = Array.isArray(obj) ? [] : {}
    if (map.get(obj)) {
      return map.get(obj)
    }
    map.set(obj, cloneObj)
    for (let key in obj) {
      cloneObj[key] = deepClone(obj[key], map)
    }
    return cloneObj
  } else {
    return obj
  }
}

