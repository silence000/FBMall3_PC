import Vue from 'vue';
import { ApiURL } from '../store/mutationsType';

export const getOrders = (params) => Vue.axios({
  url: `${ApiURL}/orders/p3/get/orders`,
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

export const getOneOrder = (params) => Vue.axios({
  url: `${ApiURL}/orders/p3/get/order/details`,
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

export const confirmOrders = (params) => Vue.axios({
  url: `${ApiURL}/orders/p3/update/confirm`,
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

export const pressOrder = (params) => Vue.axios({
  url: `${ApiURL}/orders/p3/update/distribute`,
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
