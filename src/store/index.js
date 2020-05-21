import Vue from 'vue';
import Vuex from 'vuex';

import {
  alterUserId, alterUsername, alterAccessToken, alterRefreshToken,
} from './mutationsType';
// 引入Vuex模块
import registerLogin from './modules/registerLogin';
import home from './modules/home';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ImagesServerURL: 'http://localhost/',
    clientId: 'c1',
    clientSecret: 'vY9W55NuXM9hoDlx',
    username: sessionStorage.getItem('username'),
    userId: sessionStorage.getItem('userId'),
    accessToken: sessionStorage.getItem('accessToken'),
    refreshToken: sessionStorage.getItem('refreshToken'),
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
  },
  actions: {
  },
  modules: {
    registerLogin, home,
  },
});
