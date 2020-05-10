import Vue from 'vue';
import './plugins/axios';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

// eslint-disable-next-line import/extensions
import './plugins/element.js';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/plugin/elementUI_theme/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
