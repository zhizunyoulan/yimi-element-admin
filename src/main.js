import Vue from "vue";
import App from "./App";
import Cookies from "js-cookie";
// 引入 ElementUI
import ElementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUi, {
  size: Cookies.get("size") || "medium", // set element-ui default size
});
import "@/assets/icons"; // icon
import "@/assets/css/yimi.scss";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets

// 引入YimiElement
import YimiElement from "@uublue/yimi-element";
import "@uublue/yimi-element/lib/yimi-element.css";
Vue.use(YimiElement);

//执行扫描页面，要先于构造router和store
import {scanViews} from '@/utils/page'
scanViews()

import router from "./router";
import store from "./store";

//处理接口并混入到组件中
import { convertApis } from "@/utils/api";
Vue.mixin({
  data() {
    let apis;
    if (this.$options.apis) {
      apis = convertApis(this.$options.apis);
    }
    return {
      apis,
    };
  },
});

// 将console、setTimeout、setInterval等window属性给到Vue原型，方便在template中使用
Vue.prototype.console = {
  log: console.log,
  info: console.info,
  error: console.error,
};
Vue.prototype.setTimeout = (code, milliseconds) => {
  window.setTimeout(code, milliseconds);
};
Vue.prototype.setInterval = (code, milliseconds) => {
  window.setInterval(code, milliseconds);
};

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$websiteName = "依米快速开发";

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
