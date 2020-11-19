import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import { ErrorHandlerPlugins } from './plugin/ErrorHandlerPlugins'
Vue.use(ErrorHandlerPlugins)

new Vue({
    render: h => h(App)
}).$mount("#app");
