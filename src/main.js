import Vue from 'vue'
import App from './App.vue'
//引入elementUi 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './routes';
import * as echarts from 'echarts';

import axios from 'axios';

Vue.use(ElementUI);
Vue.prototype.axios = axios; //挂在到原型，可全局使用
Vue.prototype.$echarts = echarts;//将echarts对象挂载原型上，供全局使用

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
