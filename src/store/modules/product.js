import dayjs from 'dayjs';
import {
  alterProductDetails,
  alterImageSmallUrl,
  alterProductExtra,
  alterImageExtraUrl,
  alterProductReviewsNumber,
  alterProductReviews,
} from '../mutationsType';

import {
  getProductDetails,
  getProductDetailImages,
  getProductExtra,
  getImageExtraUrl,
  getProductReviewsNumber,
  getProductReviews,
} from '../../service/product';

import { vuexResProcess } from '../../assets/util/ResProcess';

export default {
  namespaced: true,

  state: { // 数据存放
    imageSmallUrl: [], // 商品基础图片链接
    imageExtraUrl: [], // 商品额外图片链接
    productDetails: {}, // 商品基础数据
    productExtra: [], // 商品额外数据
    productReviewsNumber: '', // 商品评论总数
    productReviews: [], // 商品评论
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

    filterProductReviews(state) {
      return state.productReviews.map((item) => {
        const placeholder = '*';
        // eslint-disable-next-line no-param-reassign
        item.user = `${item.user.charAt(0)}${placeholder.repeat(item.user.length - 2)}${item.user.charAt(item.user.length - 1)}`;
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

    [alterProductReviewsNumber](state, payload) {
      state.productReviewsNumber = payload;
    },

    [alterProductReviews](state, payload) {
      state.productReviews = payload;
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

    async getProductReviewsNumber({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('id', payload);
      const { data, error } = await getProductReviewsNumber(params);
      return vuexResProcess({ commit }, alterProductReviewsNumber, data, error);
    },

    async getProductReviews({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('id', payload);
      const { data, error } = await getProductReviews(params);
      if (!data.data === false) {
        return vuexResProcess({ commit }, alterProductReviews, data, error);
      }
      const nullResponse = {
        code: 1,
        msg: 'Success',
        data: [
          {
            id: '1',
            content: '该商品暂无评论!',
            user: 'admin',
            // todo 此处不知道为什么月份会比实际月份少1
            datetime: `${dayjs().year()}-${dayjs().month() + 1}-${dayjs().date()} ${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`,
          },
        ],
        extra: null,
      };
      return vuexResProcess({ commit }, alterProductReviews, nullResponse, error);
    },
  },
};
