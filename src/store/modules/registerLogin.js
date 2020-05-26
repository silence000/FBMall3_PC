import {
  alterUsername,
  alterUserpass,
  alterUserpass2,
  alterLoading,
  alterResponseData,
  alterAccessToken,
  alterRefreshToken,
  alterProductPage,
  alterMyOrdersPage,
  alterMyCartPage,
} from '../mutationsType';

import {
  insertUser, login,
} from '../../service/registerLogin';

export default {
  namespaced: true,

  state: { // 数据存放
    username: '', // 用户名
    userpass: '', // 密码
    userpass2: '', // 校验密码
    loading: false, // 加载标记
    productPage: false, // 商品页跳转标记, 若使用则存放productId
    myOrdersPage: false, // 我的订单跳转标记
    myCartPage: false, // 我的购物车跳转标记
    responseData: { // todo 保留数据
      code: '',
      msg: '',
      data: '',
      extra: '',
    },
  },

  getters: { // 过滤器
  },

  mutations: { // 用于触发事件
    [alterUsername](state, payload) {
      state.username = payload;
    },

    [alterUserpass](state, payload) {
      state.userpass = payload;
    },

    [alterUserpass2](state, payload) {
      state.userpass2 = payload;
    },

    [alterLoading](state, payload) {
      state.loading = payload;
    },

    [alterProductPage](state, payload) {
      state.productPage = payload;
    },

    [alterMyOrdersPage](state, payload) {
      state.myOrdersPage = payload;
    },

    [alterMyCartPage](state, payload) {
      state.myCartPage = payload;
    },

    [alterResponseData](state, { // todo 保留数据
      code, msg, data, extra,
    }) {
      state.responseData.code = code;
      state.responseData.msg = msg;
      state.responseData.data = data;
      state.responseData.extra = extra;
    },
  },

  actions: { // 用于触发事件, 执行异步操作, 触发mutations, 去更新state
    async onSubmit({ commit, state }) {
      let response = '';
      commit(`${[alterLoading]}`, true);
      const params = new URLSearchParams();
      params.append('username', state.username);
      params.append('userpass', state.userpass);
      const { data, error } = await insertUser(params);
      if (typeof (data) !== 'undefined') {
        response = data;
      }
      if (typeof (error) !== 'undefined') {
        response = error;
      }
      if (typeof (data) === 'undefined' && typeof (error) === 'undefined') {
        response = 'no_response';
      }
      commit(`${[alterLoading]}`, false);
      return response;
    },

    async onLogin({ commit, state, rootState }) {
      let response = '';
      commit(`${[alterLoading]}`, true);
      const params = new URLSearchParams();
      params.append('client_id', rootState.clientId);
      params.append('client_secret', rootState.clientSecret);
      params.append('username', state.username);
      params.append('password', state.userpass);
      params.append('grant_type', 'password');
      const { data, error } = await login(params);
      if (typeof (data) !== 'undefined') {
        if (typeof (data.access_token) !== 'undefined') {
          commit(`${[alterAccessToken]}`, data.access_token, { root: true });
          commit(`${[alterRefreshToken]}`, data.refresh_token, { root: true });
          commit(`${[alterUsername]}`, state.username, { root: true });
          commit(`${[alterLoading]}`, false);
          response = 'success';
        }
      }
      if (typeof (error) !== 'undefined') {
        response = error;
      }
      if (typeof (data) === 'undefined' && typeof (error) === 'undefined') {
        response = 'no_response';
      }
      commit(`${[alterLoading]}`, false);
      return response;
    },

    onSubmit2({ commit }, payload) { // todo 保留数据
      const changed = payload + 2; // 此处假装执行了异步请求, 得到了请求后的结果 changed
      commit(`${[alterUsername]}`, changed);
    },
  },
};
