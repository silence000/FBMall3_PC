// eslint-disable-next-line import/named
import {
  alterOrdersResData,
  alterLoadingOrders,
  alterOrderItemData,
  alterOrderDetails,
  alterLoadingTables,
} from '../mutationsType';
import {
  getOrders,
  getOneOrder,
  confirmOrders,
  pressOrder,
} from '../../service/orders';
import {
  vuexResProcess,
  vuexResProcessExtra,
  vuexResProcessNoCommit,
} from '../../assets/util/ResProcess';
import PriceFix from '../../assets/util/PriceFix';

export default {
  namespaced: true,

  state: { // 数据存放
    ordersResData: [], // 从服务器中请求的订单数据
    orderItemData: [], // 订单中商品信息
    orderDetails: {}, // 订单详情
    loadingOrders: false,
    loadingTables: false,
  },

  getters: { // 过滤器
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

    filterOrderItemData(state, getters, rootState) {
      if (!state.orderItemData) {
        return [];
      }
      return state.orderItemData.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.imgUrl = `${rootState.ImagesServerURL}img/productSingle_middle/${item.imgUrl}.jpg`;
        // eslint-disable-next-line no-param-reassign
        item.originalPrice = item.promotePrice * item.number; // 修改了originalPrice显示为小计价格
        state.orderDetails.sumPrice += item.originalPrice;
        // eslint-disable-next-line no-param-reassign
        item.promotePrice = `¥ ${PriceFix(item.promotePrice)}`;
        return item;
      });
    },

    filterOrderDetails(state) {
      if (!state.orderDetails) {
        return {};
      }
      if (state.orderDetails.payDate) {
        state.orderDetails.payDate = state.orderDetails.payDate.replace('T', ' ');
        state.orderDetails.payDate = state.orderDetails.payDate.replace('.000+0000', '');
      }
      return state.orderDetails;
    },
  },

  mutations: { // 用于触发事件
    [alterOrdersResData](state, payload) {
      state.ordersResData = payload;
    },

    [alterLoadingOrders](state, payload) {
      state.loadingOrders = payload;
    },

    [alterOrderItemData](state, payload) {
      state.orderItemData = payload;
    },

    [alterOrderDetails](state, payload) {
      state.orderDetails = payload;
    },

    [alterLoadingTables](state, payload) {
      state.loadingTables = payload;
    },
  },

  actions: { // 用于触发事件, 执行异步操作, 触发mutations, 去更新state
    async getOrders({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('current', 1);
      params.append('size', 20);
      params.append('status', payload);
      commit(`${[alterLoadingOrders]}`, true);
      const { data, error } = await getOrders(params);
      commit(`${[alterLoadingOrders]}`, false);
      return vuexResProcess({ commit }, `${[alterOrdersResData]}`, data, error);
    },

    async getOneOrder({ commit }, payload) { // 获取某个订单的详情
      const params = new URLSearchParams();
      params.append('oid', payload);
      const { data, error } = await getOneOrder(params);
      return vuexResProcessExtra({ commit }, `${[alterOrderItemData]}`, `${[alterOrderDetails]}`, data, error);
    },

    // eslint-disable-next-line no-unused-vars
    async pressOrder({ commit }, payload) { // 催促卖家发货
      const params = new URLSearchParams();
      params.append('oid', payload);
      const { data, error } = await pressOrder(params);
      return vuexResProcessNoCommit(data, error);
    },

    // eslint-disable-next-line no-unused-vars
    async confirmOrders({ commit }, payload) { // 确认收货
      const params = new URLSearchParams();
      params.append('oid', payload);
      const { data, error } = await confirmOrders(params);
      return vuexResProcessNoCommit(data, error);
    },
  },
};
