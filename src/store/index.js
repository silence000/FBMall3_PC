import Vue from 'vue';
import Vuex from 'vuex';

import {
  alterUserId,
  alterUsername,
  alterAccessToken,
  alterRefreshToken,
  alterPageTitle,
} from './mutationsType';
// 引入Vuex模块
import registerLogin from './modules/registerLogin';
import home from './modules/home';
import product from './modules/product';
import category from './modules/category';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ImagesServerURL: 'http://localhost/', // 图片服务器地址
    clientId: 'c1', // 客户端ID
    clientSecret: 'vY9W55NuXM9hoDlx', // 客户端对称秘钥
    username: sessionStorage.getItem('username'), // 用户名
    userId: sessionStorage.getItem('userId'), // 用户ID
    accessToken: sessionStorage.getItem('accessToken'), // 访问Token
    refreshToken: sessionStorage.getItem('refreshToken'), // 刷新Token
    pageTitle: '',
  },
  mutations: {
    [alterUsername](state, payload) {
      state.username = payload;
      sessionStorage.setItem('username', payload);
    },

    [alterUserId](state, payload) {
      state.userId = payload;
      sessionStorage.setItem('userId', payload);
    },

    [alterAccessToken](state, payload) {
      state.accessToken = payload;
      sessionStorage.setItem('alterAccessToken', payload);
    },

    [alterRefreshToken](state, payload) {
      state.refreshToken = payload;
      sessionStorage.setItem('refreshToken', payload);
    },

    [alterPageTitle](state, payload) {
      state.pageTitle = `FBMall3 - ${payload}`;
      document.title = state.pageTitle;
    },
  },
  actions: {
  },
  modules: {
    registerLogin, home, product, category,
  },
});
