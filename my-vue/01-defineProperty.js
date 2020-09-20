// 对象响应式原理
// 1.Object.defineProperty()

function defineReactive(obj, key, val) {
  // val可能是对象，需要递归处理
  observe(val);

  Object.defineProperty(obj, key, {
    get() {
      // console.log("get", val);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", newVal);
        observe(newVal);
        val = newVal;
      }
    },
  });
}
const orginalProto = Array.prototype;
const arrayProto = Object.create(orginalProto);

["push", "shift", "unshift", "pop"].forEach((method) => {
  arrayProto[method] = function () {
    //原始操作
    orginalProto[method].apply(this, arguments);
    console.log(`数组执行${method}操作`);
  };
});
// 对象响应式处理
function observe(obj) {
  // 判断obj类型必须是对象
  if (typeof obj !== "object" || obj == null) {
    return;
  }
  if (Array.isArray(obj)) {
    obj.__proto__ = arrayProto;
    obj.forEach((v) => {
      observe(v);
    });

    // const keys = Object.keys(obj);
    // for (let i = 0; i < obj.length; i++) {
    //   observe(obj[i]);
    // }
  } else {
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
  }
}

function set(obj, key, val) {
  defineReactive(obj, key, val);
}

const obj = { foo: "foo", bar: "bar", baz: { a: 1 }, arr: [1] };

// defineReactive(obj, 'foo', 'foo')
observe(obj);

// obj.foo
// obj.foo = 'foooooo'
// obj.bar
// obj.baz.a = 10
// obj.baz = { a: 10 }
// obj.baz.a = 100
// obj.dong = 'dong'
// set(obj, 'dong', 'dong')
// obj.dong
// Object.defineProperty()对数组无效
// 分析：改变数组方法只有7个
// 解决方案：替换数组实例的原型方法，让他们在修改数组同时还可以通知更新
obj.arr.push(4);
