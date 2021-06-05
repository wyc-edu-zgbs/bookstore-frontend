import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './theme/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI);

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.config.productionTip = false

import AxiosPlugin from './utils/AxiosPlugin.js'
Vue.use(AxiosPlugin)

import './utils/filter.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
