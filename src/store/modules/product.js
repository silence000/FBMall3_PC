import {
  alterProductDetails,
  alterImageSmallUrl,
  alterProductExtra,
  alterImageExtraUrl,
} from '../mutationsType';

import {
  getProductDetails, getProductDetailImages, getProductExtra, getImageExtraUrl,
} from '../../service/product';

import { vuexResProcess } from '../../assets/util/ResProcess';

export default {
  namespaced: true,

  state: { // 数据存放
    imageSmallUrl: [], // 商品基础图片链接
    imageExtraUrl: [], // 商品额外图片链接
    productDetails: {}, // 商品基础数据
    productExtra: [], // 商品额外数据
  },

  getters: { // 过滤器
    filterImageSmallUrl(state, getters, rootState) {
      return state.imageSmallUrl.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.link = `${rootState.ImagesServerURL}img/productSingle_middle/${item.link}.jpg`;
        return item;
      });
    },

    filterImageExtraUrl(state, getters, rootState) {
      return state.imageExtraUrl.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.link = `${rootState.ImagesServerURL}img/productDetail/${item.link}.jpg`;
        return item;
      });
    },

    filterProductExtra(state) {
      return state.productExtra.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.descKey += '：';
        return item;
      });
    },
  },

  mutations: { // 用于触发事件
    [alterProductDetails](state, payload) {
      state.productDetails = payload;
    },

    [alterImageSmallUrl](state, payload) {
      state.imageSmallUrl = payload;
    },

    [alterProductExtra](state, payload) {
      state.productExtra = payload;
    },

    [alterImageExtraUrl](state, payload) {
      state.imageExtraUrl = payload;
    },
  },

  actions: { // 用于触发事件, 执行异步操作, 触发mutations, 去更新state
    async getProductDetails({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('id', payload);
      const { data, error } = await getProductDetails(params);
      return vuexResProcess({ commit }, alterProductDetails, data, error);
    },

    async getProductDetailImages({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('id', payload);
      const { data, error } = await getProductDetailImages(params);
      return vuexResProcess({ commit }, alterImageSmallUrl, data, error);
    },

    async getProductExtra({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('id', payload);
      const { data, error } = await getProductExtra(params);
      return vuexResProcess({ commit }, alterProductExtra, data, error);
    },

    async getImageExtraUrl({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('id', payload);
      const { data, error } = await getImageExtraUrl(params);
      return vuexResProcess({ commit }, alterImageExtraUrl, data, error);
    },
  },
};
