import {
  alterMenuNavItem,
  alterSlideMenuKey,
  alterRecommends,
  alterSlideMenuContent,
} from '../mutationsType';

import {
  getCategoryItem, getSlideMenuContent,
} from '../../service/home';

import { vuexResProcess } from '../../assets/util/ResProcess';

export default {
  namespaced: true,

  state: { // 数据存放
    recommends: [], // 搜索栏下方推荐
    menuNavItem: [], // 横向菜单数据
    slideMenuKey: [], // 侧边导航数据
    slideMenuContent: [], // 侧边导航弹出数据
  },

  getters: { // 过滤器
    filterSlideMenuContent(state) {
      return state.slideMenuContent.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.subTitle = item.subTitle.replace(/[ ]/g, '\b \b \b \b \b \b \b');
        return item;
      });
    }
    ,
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
  },

  actions: { // 用于触发事件, 执行异步操作, 触发mutations, 去更新state
    async getMenuNavItem({ commit }) {
      const params = new URLSearchParams();
      params.append('current', 1);
      params.append('size', 4);
      const { data, error } = await getCategoryItem(params);
      return vuexResProcess({ commit }, alterMenuNavItem, data, error);
    },

    async getRecommends({ commit }) {
      const params = new URLSearchParams();
      params.append('current', 2);
      params.append('size', 4);
      const { data, error } = await getCategoryItem(params);
      return vuexResProcess({ commit }, alterRecommends, data, error);
    },

    async getSlideMenuKey({ commit }) {
      const params = new URLSearchParams();
      params.append('current', 1);
      params.append('size', 17);
      const { data, error } = await getCategoryItem(params);
      return vuexResProcess({ commit }, alterSlideMenuKey, data, error);
    },

    async getSlideMenuContent({ commit }, payload) {
      const params = new URLSearchParams();
      params.append('categoryId', payload);
      const { data, error } = await getSlideMenuContent(params);
      return vuexResProcess({ commit }, alterSlideMenuContent, data, error);
    },
  },
};
