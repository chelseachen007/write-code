let KVue;

class KVueRouter {
  constructor(options) {
    this.$options = options;
    let initial = window.location.hash.slice(1) || "/";
    console.log(KVue.util);

    KVue.util.defineReactive(this, "current", initial);
    this.routeMap = {};
    this.$options.routes.forEach((route) => {
      this.routeMap[route.path] = route;
    });
    window.addEventListener("hashchange", this.onHashChange.bind(this));
  }
  onHashChange() {
    this.current = window.location.hash.slice(1);
    console.log(this.current);
  }
}

KVueRouter.install = function(Vue) {
  KVue = Vue;
  // 1.挂载$router
  Vue.mixin({
    beforeCreate() {
      // 全局混入，将来在组件实例化的时s候才执行
      // 此时router实例是不是已经存在了
      // this指的是组件实例
      if (this.$options.router) {
        // 挂载
        Vue.prototype.$router = this.$options.router;
      }
    },
  });
  // 注册两个组件
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      return h(
        "a",
        {
          attrs: {
            href: "#" + this.to,
          },
        },
        this.$slots.default
      );
    },
  });
  Vue.component("router-view", {
    render(h) {
      //   const routes = this.$router.$options.routes;
      //   const current = this.$router.current;
      //   const route = routes.find((route) => route.path === current);
      //   const comp = route ? route.component : null;
      const { routeMap, current } = this.$router;
      const comp = routeMap[current] ? routeMap[current].component : null;
      return h(comp);
    },
  });
};
export default KVueRouter;
