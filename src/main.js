import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/base.scss"
import "@/assets/css/Modify.scss"
import 'element-ui/lib/theme-chalk/index.css';
import Icon from 'vue2-svg-icon/Icon.vue'
import ElementUI from 'element-ui';


Vue.use(ElementUI);
Vue.component('icon', Icon)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
