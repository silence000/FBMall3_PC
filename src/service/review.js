import Vue from 'vue';
import { ApiURL } from '../store/mutationsType';

export const getProductInfo = (params) => Vue.axios.get(`${ApiURL}/products/get/product_details`, { params })
  .then((response) => response)
  .catch((error) => {
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });

export const getProductReviews = (params) => Vue.axios.get(`${ApiURL}/reviews/get/reviews`, { params })
  .then((response) => response)
  .catch((error) => {
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });

export const getProductImgUrl = (params) => Vue.axios.get(`${ApiURL}/products/get/product_one_image`, { params })
  .then((response) => response)
  .catch((error) => {
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });

export const insertReview = (params) => Vue.axios({
  url: `${ApiURL}/reviews/p3/insert/reviews`,
  method: 'post',
  data: params,
  headers: {
    Authorization: `Bearer ${Vue.prototype.$myStore.state.accessToken}`,
  },
})
  .then((response) => response)
  .catch((error) => {
    console.log(error);
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });

export const completeOrder = (params) => Vue.axios({
  url: `${ApiURL}/orders/p3/update/finish`,
  method: 'post',
  data: params,
  headers: {
    Authorization: `Bearer ${Vue.prototype.$myStore.state.accessToken}`,
  },
})
  .then((response) => response)
  .catch((error) => {
    console.log(error);
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });
