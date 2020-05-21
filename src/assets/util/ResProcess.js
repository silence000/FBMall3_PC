import Vue from 'vue';

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

function pageResProcess(data) {
  if (typeof (data.code) !== 'undefined') {
    if (data.code !== 1) {
      Vue.prototype.$message.error('内容加载失败');
      console.log(data);
    }
  } else {
    Vue.prototype.$message.error('请求失败：服务器内部错误或请求超时');
    console.log(data);
  }
}
export { vuexResProcess, pageResProcess };
