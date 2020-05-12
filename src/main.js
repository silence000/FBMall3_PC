import Vue from 'vue';
import ElementUI from 'element-ui';
import Axios from './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';

// ElementUI框架
// eslint-disable-next-line import/extensions
import './plugins/element.js';
import 'element-ui/lib/theme-chalk/index.css';
// ElementUI主题
import './assets/plugin/elementUI_theme/index.css';
// FontAwesome图标库
import './assets/plugin/font-awesome-4.7.0/css/font-awesome.min.css';

Vue.config.productionTip = false;
Vue.use(Axios, ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
