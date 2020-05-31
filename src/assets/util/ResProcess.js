import Vue from 'vue';
import Router from '../../router';

function vuexResProcess({ commit }, commitMutations, data, error) {
  let response = '';
  if (typeof (data) !== 'undefined') {
    if (typeof (data.data) !== 'undefined') {
      commit(commitMutations, data.data);
      response = data;
    }
  }
  if (typeof (error) !== 'undefined') {
    response = error;
  }
  if (typeof (data) === 'undefined' && typeof (error) === 'undefined') {
    response = 'no_response';
  }
  return response;
}

function vuexResProcessExtra({ commit }, commitMutations1, commitMutations2, data, error) {
  let response = '';
  if (typeof (data) !== 'undefined') {
    if (typeof (data.data) !== 'undefined') {
      commit(commitMutations1, data.data);
    }
    if (typeof (data.extra) !== 'undefined') {
      commit(commitMutations2, data.extra);
    }
    response = data;
  }
  if (typeof (error) !== 'undefined') {
    response = error;
  }
  if (typeof (data) === 'undefined' && typeof (error) === 'undefined') {
    response = 'no_response';
  }
  return response;
}

function vuexResProcessNoCommit(data, error) {
  let response = '';
  if (typeof (data) !== 'undefined') {
    if (typeof (data.data) !== 'undefined') {
      response = data;
    }
  }
  if (typeof (error) !== 'undefined') {
    response = error;
  }
  if (typeof (data) === 'undefined' && typeof (error) === 'undefined') {
    response = 'no_response';
  }
  return response;
}

function pageResProcess(data) {
  if (typeof (data.code) !== 'undefined') {
    if (data.code !== 1) {
      Vue.prototype.$message.error('内容加载失败');
      console.log(data);
    }
    if (data.code === 1 && data.data === 'no_data') {
      Vue.prototype.$message.warning('抱歉，暂无该商品');
    }
  } else {
    Vue.prototype.$message.error('请求失败：服务器内部错误或请求超时');
    console.log(data);
  }
}

function pageNoticeResProcess(data, productId, msgSuccess, msgFail) {
  if (typeof (data.code) !== 'undefined') {
    if (data.code === 1) {
      Vue.prototype.$message.success(msgSuccess);
    }
    if (data.code === 0) {
      Vue.prototype.$message.error(msgFail);
    }
  } else if (data === 'invalid_token') {
    Vue.prototype.$message.error('登录状态过期，请重新登录！');
    sessionStorage.clear();
    Vue.prototype.$myStore.commit('alterUsername', '');
    Vue.prototype.$myStore.commit('registerLogin/alterProductPage', productId);
    setTimeout(() => {
      Router.push('/login');
    }, 500);
  } else {
    Vue.prototype.$message.error('请求失败：服务器内部错误或请求超时');
    console.log(data);
  }
}

function pageMuteResProcess(data, msgFail) {
  if (typeof (data.code) !== 'undefined') {
    if (data.code === 1) {
      // Vue.prototype.$message.success(msgSuccess);
    }
    if (data.code === 0) {
      Vue.prototype.$message.error(msgFail);
    }
  } else if (data === 'invalid_token') {
    Vue.prototype.$message.error('登录状态过期，请重新登录！');
    sessionStorage.clear();
    Vue.prototype.$myStore.commit('alterUsername', '');
    Vue.prototype.$myStore.commit('registerLogin/alterMyCartPage', true);
    setTimeout(() => {
      Router.push('/login');
    }, 500);
  } else {
    Vue.prototype.$message.error('请求失败：服务器内部错误或请求超时');
    console.log(data);
  }
}
export {
  vuexResProcess,
  vuexResProcessExtra,
  vuexResProcessNoCommit,
  pageResProcess,
  pageNoticeResProcess,
  pageMuteResProcess,
};
