import Vue from 'vue';
import { ApiURL } from '../store/mutationsType';

export const getProductInCart = (params) => Vue.axios({
  url: `${ApiURL}/users/p3/get/cart`,
  method: 'get',
  params,
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

export const insertOrder = (params) => Vue.axios({
  url: `${ApiURL}/orders/p3/insert/order`,
  method: 'post',
  data: params,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
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

export const payOrders = (params) => Vue.axios({
  url: `${ApiURL}/orders/p3/update/pay`,
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
