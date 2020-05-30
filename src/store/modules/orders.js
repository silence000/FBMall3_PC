// eslint-disable-next-line import/named
import { alterOrdersResData, alterLoadingOrders } from '../mutationsType';
import { getOrders } from '../../service/orders';
import { vuexResProcess } from '../../assets/util/ResProcess';
import PriceFix from '../../assets/util/PriceFix';

export default {
  namespaced: true,

  state: { // 数据存放
    ordersResData: [], // 从服务器中请求的订单数据
    loadingOrders: false,
  },

  getters: { // 过滤器
    // eslint-disable-next-line no-unused-vars
    filterOrdersResData(state, getters, rootState) {
      if (!state.ordersResData) {
        return [];
      }
      return state.ordersResData.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item[0].createDate = item[0].createDate.replace('T', ' ');
        // eslint-disable-next-line no-param-reassign
        item[0].createDate = item[0].createDate.replace('.000+0000', '');
        let sumPrice = 0;
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i < item.length; i++) {
          sumPrice += item[i].promotePrice * item[i].number;
          // eslint-disable-next-line no-param-reassign
          item[i].imgUrl = `${rootState.ImagesServerURL}img/productSingle_middle/${item[i].imgUrl}.jpg`;
          // eslint-disable-next-line no-param-reassign
          item[i].originalPrice = `¥ ${PriceFix(item[i].originalPrice)}`;
          // eslint-disable-next-line no-param-reassign
          item[i].promotePrice = `¥ ${PriceFix(item[i].promotePrice)}`;
        }
        // eslint-disable-next-line no-param-reassign
        item[0].sumPrice = `¥ ${PriceFix(sumPrice)}`;
        return item;
      });
    },
  },

  mutations: { // 用于触发事件
    [alterOrdersResData](state, payload) {
      state.ordersResData = payload;
    },

    [alterLoadingOrders](state, payload) {
      state.loadingOrders = payload;
    },
  },

  actions: { // 用于触发事件, 执行异步操作, 触发mutations, 去更新state
    // eslint-disable-next-line no-unused-vars
    async getOrders({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('current', 1);
      params.append('size', 10);
      params.append('status', payload);
      commit(`${[alterLoadingOrders]}`, true);
      const { data, error } = await getOrders(params);
      commit(`${[alterLoadingOrders]}`, false);
      return vuexResProcess({ commit }, `${[alterOrdersResData]}`, data, error);
    },
  },
};
