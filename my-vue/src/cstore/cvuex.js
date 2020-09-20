let KVue;
function partial(fn, arg) {
  return function() {
      
    return fn(arg);
  };
}
function forEachValue(obj, fn) {
  Object.keys(obj).forEach((key) => fn(obj[key], key));
}
class Kvuex {
  constructor(options) {
    this.$options = options;

    this._mutations = options.mutations;
    this._actions = options.actions;
    this._WrapGetters = options.getters;
    this.getters = options.getters;
    // 绑定this到store实例
    const store = this;
    const { commit, dispatch } = store;
    this.commit = function bundCommit(type, payload) {
      commit.call(store, type, payload);
    };
    this.dispatch = function bundDispath(type, payload) {
      dispatch.call(store, type, payload);
    };
    this._vm = new KVue({
      data: {
        $$state: this.$options.state,
      },
    });
    //暗号：天王盖地虎
    const computed = {};
    const WrapGetters = store._WrapGetters;
    forEachValue(WrapGetters, (fn, key) => {
      computed[key] = partial(fn, store.state);
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key],
        enumerable: true, // for local getters
      });
    });

    this._vm = new KVue({
      data: {
        $$state: this.$options.state,
      },
      computed,
    });
    console.log(this._vm);
  }

  get state() {
    return this._vm._data.$$state;
  }
  set state(v) {
    return console.error("禁止修改state");
  }
  commit(type, payload) {
    const enter = this._mutations[type];
    if (!enter) {
      console.error("没有注册这个muatations");
    }
    enter(this.state, payload);
  }

  dispatch(type, payload) {
    const enter = this._actions[type];
    if (!enter) {
      console.error("没有注册这个actions");
    }
    return enter(this, payload);
  }
}
function install(Vue) {
  KVue = Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}
export default { Store: Kvuex, install };

/* // determine current view depth, also check to see if the tree
// has been toggled inactive but kept-alive.
let depth = 0;
while (parent && parent._routerRoot !== parent) {
  const vnodeData = parent.$vnode ? parent.$vnode.data : {};
  if (vnodeData.routerView) {
    depth++;
  }
  parent = parent.$parent;
}
data.routerViewDepth = depth;
const matched = route.matched[depth];
const component = matched && matched.components[name];
return h(component, data, children);
//通过向上一直寻找是否有parent，来判断自己的routeview深度 */
