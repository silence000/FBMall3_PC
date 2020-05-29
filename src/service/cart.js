import Vue from 'vue';
import { ApiURL } from '../store/mutationsType';

export const getProductInCart = (params) => Vue.axios({
  url: `${ApiURL}/users/p3/get/cart`,
  method: 'get',
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

export const updateProductInCart = (params) => Vue.axios({
  url: `${ApiURL}/users/p3/update/cart`,
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

export const deleteProductInCart = (params) => Vue.axios({
  url: `${ApiURL}/users/p3/delete/cart`,
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

export const commitInCart = (params) => Vue.axios({
  url: `${ApiURL}/users/p3/commit/cart`,
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
