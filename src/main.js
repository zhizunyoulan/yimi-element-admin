import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import Vuex from "vuex";
Vue.use(Vuex);

// 引入 ElementUI
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
})

// 引入YimiElement
import YimiElement from '@uublue/yimi-element'
import '@uublue/yimi-element/lib/yimi-element.css'
Vue.use(YimiElement)


import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/assets/icons' // icon
import '@/assets/css/yimi.scss'

Vue.prototype.console = {
  info: console.info,
  log: console.log,
  error: console.error,
}

Vue.prototype.setTimeout = (code, milliseconds) => {
  window.setTimeout(code, milliseconds)
}
Vue.prototype.setInterval = (code, milliseconds) => {
  window.setInterval(code, milliseconds)
}


Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$websiteName = '依米快速开发';

new Vue({
  el: "#app",
  router,
  store,
  components: {
    App,
  },
  template: "<App/>",
  render: (h) => h(App),
});