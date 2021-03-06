import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/css/base.scss"
import "@/assets/css/Modify.scss"
import Icon from 'vue2-svg-icon/Icon.vue'
import ElementUI from 'element-ui';
import axios from 'axios'
import qs from 'qs'
import vfilters from  './filter/filter'
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'


Vue.use(IScrollView, IScroll)
// import zh from 'vee-validate/dist/locale/zh_CN';
//
// Validator.addLocale(zh);
//
// const config = {
//     locale: 'zh_CN'
// };
//
// Vue.use(VeeValidate,config);



// for (let key in vfilters){
//   Vue.filter(key,vfilters[key])
// }

Object.keys(vfilters).forEach(key => Vue.filter(key, vfilters[key]));
//线上接口
axios.defaults.baseURL='http://101.132.141.115:9095/ldview-interface/f'
//路灯局接口
// axios.defaults.baseURL='http://172.16.10.160:9095/ldview-interface/f'
// axios.defaults.baseURL='http://192.168.4.109:9095/ldview-interface/f'


// axios.interceptors.request.use(
//     config => {
//         if (store.state.user) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//             console.log('添加');
//             config.headers.Authorization = `userId${store.state.user.userId} sessionId ${store.state.user.sessionId}`;
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });

Vue.use(ElementUI);
Vue.component('icon', Icon)
Vue.use(require('moment'))

Vue.config.productionTip = false;
Vue.prototype.axios = axios
Vue.prototype.qs = qs

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

