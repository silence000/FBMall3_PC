import {
  alterCartResData,
  alterCartLocalData,
} from '../mutationsType';

import {
  getProductInCart,
  updateProductInCart,
  deleteProductInCart,
} from '../../service/cart';

import {
  vuexResProcess, vuexResProcessNoCommit,
} from '../../assets/util/ResProcess';

import PriceFix from '../../assets/util/PriceFix';

export default {
  namespaced: true,

  state: { // 数据存放
    cartResData: [], // 从服务器中请求的购物车信息
    cartLocalData: [], // Vuex中本地存储的购物车信息
  },

  getters: { // 过滤器
    filterCartResData(state, getters, rootState) {
      return state.cartResData.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.total = `¥ ${PriceFix(item.promotePrice * item.number)}`;
        // eslint-disable-next-line no-param-reassign
        item.imgUrl = `${rootState.ImagesServerURL}img/productSingle_middle/${item.imgUrl}.jpg`;
        // eslint-disable-next-line no-param-reassign
        item.promotePrice = `¥ ${PriceFix(item.promotePrice)}`;
        // eslint-disable-next-line no-param-reassign
        item.originalPrice = `¥ ${PriceFix(item.originalPrice)}`;
        return item;
      });
    },
  },

  mutations: { // 用于触发事件
    [alterCartResData](state, payload) {
      state.cartResData = payload;
    },

    [alterCartLocalData](state, payload) {
      state.cartLocalData = payload;
    },
  },

  actions: { // 用于触发事件, 执行异步操作, 触发mutations, 去更新state
    async getProductInCart({ commit }) {
      const params = new URLSearchParams();
      params.append('current', 1);
      params.append('size', 10);
      const { data, error } = await getProductInCart(params);
      return vuexResProcess({ commit }, `${[alterCartResData]}`, data, error);
    },

    // eslint-disable-next-line no-unused-vars
    async updateProductInCart({ commit }, payload) {
      const { pid, num } = payload;
      const params = new URLSearchParams();
      params.append('pid', pid);
      params.append('num', num);
      const { data, error } = await updateProductInCart(params);
      return vuexResProcessNoCommit(data, error);
    },

    // eslint-disable-next-line no-unused-vars
    async deleteProductInCart({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('pid', payload);
      const { data, error } = await deleteProductInCart(params);
      return vuexResProcessNoCommit(data, error);
    },
  },
};
