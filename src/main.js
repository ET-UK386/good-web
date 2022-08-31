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



// axios.defaults.timeout = 15000; // 响应的超时时间
// axios.defaults.withCredentials = true; // 支持跨域访问
// // 为post请求设置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = "http://xxxxxxxxxxx:xxxx/"
// // 发送请求之前先为请求头添加Authorization字段且值为token，以应对后端接口的验证
// axios.interceptors.request.use(config => {
//     // 在浏览器的 Session Storage 中拿到 token 值
//     config.headers.Authorization = sessionStorage.getItem("token");
//     return config;
// })

Vue.config.productionTip = false
//路由全局前置守卫
router.beforeEach((to,from,next) => {
  if(to.path === '/login' || to.path === '/'){ //若是进入登录与注册页面 ==> pass
    next()
  }else{ 
    let userToken = sessionStorage.getItem('token');
    console.log("Token为:"+userToken); 
    if(userToken == null || userToken == ''){
      alert("无权限，请先登录!");
      return next('/');
    }else{
      next();
    }
  }
}),

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
