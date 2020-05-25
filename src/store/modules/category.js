import { alterCategoryProductInfo } from '../mutationsType';

import { getCategoryItem } from '../../service/category';

import { vuexResProcess } from '../../assets/util/ResProcess';
import PriceFix from '../../assets/util/PriceFix';

export default {
  namespaced: true,

  state: { // 数据存放
    categoryProductInfo: [],
  },

  getters: { // 过滤器
    filterCategoryProductInfo(state, getters, rootState) {
      return state.categoryProductInfo.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.imgUrl = `${rootState.ImagesServerURL}img/productSingle_middle/${item.imgUrl}.jpg`;
        // eslint-disable-next-line no-param-reassign
        item.promotePrice = `¥ ${PriceFix(item.promotePrice)}`;
        return item;
      });
    },
  },

  mutations: { // 用于触发事件
    [alterCategoryProductInfo](state, payload) {
      state.categoryProductInfo = payload;
    },
  },

  actions: { // 用于触发事件, 执行异步操作, 触发mutations, 去更新state
    async getProductByCategory({ commit }, payload) {
      const {
        payloadParam, cid, name, lowPrice, heiPrice,
      } = payload;
      const params = new URLSearchParams();
      params.append('current', 1);
      params.append('size', 10);
      if (payloadParam) {
        params.append('sortType', payloadParam);
      }
      if (cid) {
        params.append('cid', cid);
      }
      if (name) {
        params.append('productName', name);
      }
      if (lowPrice) {
        params.append('lowPrice', lowPrice);
      }
      if (heiPrice) {
        params.append('heiPrice', heiPrice);
      }
      const { data, error } = await getCategoryItem(params);
      if (!data.data === false) {
        return vuexResProcess({ commit }, alterCategoryProductInfo, data, error);
      }
      return {
        code: 1,
        msg: 'Success',
        data: 'no_data',
        extra: null,
      };
    },
  },
};
