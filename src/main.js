import Vue from "vue";
import "./cube-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";
import axios from "axios";
import setAxios from "./setAxios";

setAxios();
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
