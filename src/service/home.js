import Vue from 'vue';
import { ApiURL } from '../store/mutationsType';

export const getCategoryItem = (params) => Vue.axios.get(`${ApiURL}/products/get/category`, { params })
  .then((response) => response)
  .catch((error) => {
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });

export const getSlideMenuContent = (params) => Vue.axios.get(`${ApiURL}/products/get/main_menu`, { params })
  .then((response) => response)
  .catch((error) => {
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });

export const getListProductInfo = (params) => Vue.axios.get(`${ApiURL}/products/get/main_list`, { params })
  .then((response) => response)
  .catch((error) => {
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });
