import Vue from "vue";
import App from "./App.vue";
import router from "./router";
require('../public/sdk/record.js')
Vue.config.productionTip = false;

// import { ErrorHandlerPlugins } from './plugin/ErrorHandlerPlugins'
// Vue.use(ErrorHandlerPlugins)

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
