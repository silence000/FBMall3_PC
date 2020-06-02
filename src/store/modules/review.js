import dayjs from 'dayjs';
import {
  alterProductInfo,
  alterProductReviewsData,
  alterProductImgUrl,
  alterLoadingImg,
} from '../mutationsType';
import {
  getProductInfo,
  getProductReviews,
  getProductImgUrl,
  insertReview,
  completeOrder,
} from '../../service/review';
import { vuexResProcess, vuexResProcessNoCommit } from '../../assets/util/ResProcess';

export default {
  namespaced: true,

  state: { // 数据存放
    productInfo: {}, // 商品简略信息
    productReviewsData: [], // 商品评论
    productImgUrl: {}, // 商品图片链接
    loadingImg: true, // 图片加载中
  },

  getters: { // 过滤器
    filterProductReviews(state) {
      if (!state.productReviewsData) {
        return [];
      }
      return state.productReviewsData.map((item) => {
        const placeholder = '*';
        // eslint-disable-next-line no-param-reassign
        item.user = `${item.user.charAt(0)}${placeholder.repeat(item.user.length - 2)}${item.user.charAt(item.user.length - 1)}`;
        return item;
      });
    },

    filterProductImgUrl(state, getters, rootState) {
      state.productImgUrl.link = `${rootState.ImagesServerURL}img/productSingle/${state.productImgUrl.link}.jpg`;
      return state.productImgUrl;
    },
  },

  mutations: { // 用于触发事件
    [alterProductInfo](state, payload) {
      state.productInfo = payload;
    },

    [alterProductReviewsData](state, payload) {
      state.productReviewsData = payload;
    },

    [alterProductImgUrl](state, payload) {
      state.productImgUrl = payload;
    },

    [alterLoadingImg](state, payload) {
      state.loadingImg = payload;
    },
  },

  actions: { // 用于触发事件, 执行异步操作, 触发mutations, 去更新state
    // eslint-disable-next-line no-unused-vars
    async completeOrder({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('oid', payload);
      const { data, error } = await completeOrder(params);
      return vuexResProcessNoCommit(data, error);
    },

    // eslint-disable-next-line no-unused-vars
    async insertReview({ commit }, payload) {
      const { id, review } = payload;
      const params = new URLSearchParams();
      params.append('id', id);
      params.append('review', review);
      const { data, error } = await insertReview(params);
      return vuexResProcessNoCommit(data, error);
    },

    async getProductImgUrl({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('id', payload);
      const { data, error } = await getProductImgUrl(params);
      return vuexResProcess({ commit }, `${[alterProductImgUrl]}`, data, error);
    },

    async getProductInfo({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('id', payload);
      const { data, error } = await getProductInfo(params);
      return vuexResProcess({ commit }, `${[alterProductInfo]}`, data, error);
    },

    async getProductReviews({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('id', payload);
      const { data, error } = await getProductReviews(params);
      if (!data.data === false) {
        return vuexResProcess({ commit }, `${[alterProductReviewsData]}`, data, error);
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
      return vuexResProcess({ commit }, `${[alterProductReviewsData]}`, nullResponse, error);
    },
  },
};
