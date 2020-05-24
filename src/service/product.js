import Vue from 'vue';
import { ApiURL } from '../store/mutationsType';

export const getProductDetails = (params) => Vue.axios.get(`${ApiURL}/products/get/product_details`, { params })
  .then((response) => response)
  .catch((error) => {
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });

export const getProductDetailImages = (params) => Vue.axios.get(`${ApiURL}/products/get/product_detail_image`, { params })
  .then((response) => response)
  .catch((error) => {
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });

export const getProductExtra = (params) => Vue.axios.get(`${ApiURL}/products/get/product_extra`, { params })
  .then((response) => response)
  .catch((error) => {
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });

export const getImageExtraUrl = (params) => Vue.axios.get(`${ApiURL}/products/get/product_extra_image`, { params })
  .then((response) => response)
  .catch((error) => {
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });
