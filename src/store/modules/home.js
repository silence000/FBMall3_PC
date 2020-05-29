import {
  alterMenuNavItem,
  alterSlideMenuKey,
  alterRecommends,
  alterSlideMenuContent,
  alterListProductInfo,
} from '../mutationsType';

import {
  getCategoryItem, getSlideMenuContent, getListProductInfo,
} from '../../service/home';

import { vuexResProcess } from '../../assets/util/ResProcess';
import PriceFix from '../../assets/util/PriceFix';

export default {
  namespaced: true,

  state: { // 数据存放
    recommends: [], // 搜索栏下方推荐
    menuNavItem: [], // 横向菜单数据
    slideMenuKey: [], // 侧边导航数据
    slideMenuContent: [], // 侧边导航弹出数据
    listProductInfo: [], // 主页推荐商品数据
  },

  getters: { // 过滤器
    filterSlideMenuContent(state) {
      if (!state.slideMenuContent) {
        return [];
      }
      return state.slideMenuContent.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.subTitle = item.subTitle.replace(/[ ]/g, '\b \b \b \b \b \b \b');
        return item;
      });
    },

    filterListProductInfo(state, getters, rootState) {
      if (!state.listProductInfo) {
        return [];
      }
      return state.listProductInfo.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.content.map((atom) => {
          // eslint-disable-next-line no-param-reassign
          atom.imgUrl = `${rootState.ImagesServerURL}img/productSingle_middle/${atom.imgUrl}.jpg`;
          // eslint-disable-next-line no-param-reassign
          atom.promotePrice = `¥ ${PriceFix(atom.promotePrice)}`;
          return atom;
        });
        return item;
      });
    },
  },

  mutations: { // 用于触发事件
    [alterMenuNavItem](state, payload) {
      state.menuNavItem = payload;
    },

    [alterSlideMenuKey](state, payload) {
      state.slideMenuKey = payload;
    },

    [alterRecommends](state, payload) {
      state.recommends = payload;
    },

    [alterSlideMenuContent](state, payload) {
      state.slideMenuContent = payload;
    },

    [alterListProductInfo](state, payload) {
      state.listProductInfo = payload;
    },
  },

  actions: { // 用于触发事件, 执行异步操作, 触发mutations, 去更新state
    async getMenuNavItem({ commit }) {
      const params = new URLSearchParams();
      params.append('current', 1);
      params.append('size', 4);
      const { data, error } = await getCategoryItem(params);
      return vuexResProcess({ commit }, `${[alterMenuNavItem]}`, data, error);
    },

    async getRecommends({ commit }) {
      const params = new URLSearchParams();
      params.append('current', 2);
      params.append('size', 4);
      const { data, error } = await getCategoryItem(params);
      return vuexResProcess({ commit }, `${[alterRecommends]}`, data, error);
    },

    async getSlideMenuKey({ commit }) {
      const params = new URLSearchParams();
      params.append('current', 1);
      params.append('size', 17);
      const { data, error } = await getCategoryItem(params);
      return vuexResProcess({ commit }, `${[alterSlideMenuKey]}`, data, error);
    },

    async getSlideMenuContent({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('categoryId', payload);
      const { data, error } = await getSlideMenuContent(params);
      return vuexResProcess({ commit }, `${[alterSlideMenuContent]}`, data, error);
    },

    async getListProductInfo({ commit }) {
      const params = new URLSearchParams();
      params.append('cateCurrent', 1);
      params.append('cateSize', 20);
      params.append('productCurrent', 1);
      params.append('productSize', 5);
      const { data, error } = await getListProductInfo(params);
      return vuexResProcess({ commit }, `${[alterListProductInfo]}`, data, error);
    },
  },
};
