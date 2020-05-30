import Vue from 'vue';
import { ApiURL } from '../store/mutationsType';

// eslint-disable-next-line import/prefer-default-export,no-unused-vars
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
