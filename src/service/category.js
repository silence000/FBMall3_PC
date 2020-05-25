import Vue from 'vue';
import { ApiURL } from '../store/mutationsType';

// eslint-disable-next-line import/prefer-default-export
export const getCategoryItem = (params) => Vue.axios.get(`${ApiURL}/products/get/product/condition`, { params })
  .then((response) => response)
  .catch((error) => {
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });
