import Vue from 'vue';
import { ApiURL } from '../store/mutationsType';

export const insertUser = (params) => Vue.axios.post(`${ApiURL}/users/insert/user`, params)
  .then((response) => response)
  .catch((error) => {
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });

export const login = (params) => Vue.axios.post(`${ApiURL}/uaa/oauth/token`, params, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})
  .then((response) => response)
  .catch((error) => {
    if (typeof (error.response) !== 'undefined') {
      return error.response.data;
    }
    return error;
  });
