
class MUtil {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || null,
        success: res => {
          // console.log(res)
          if(res.status === 0) { // 请求success
            typeof resolve === 'function' && resolve(res.data, res.msg)
          } else if(res.status === 10) { // 用户未登录
            this.doLogin(); // 跳转到登录页
          } else { // 其他都是fail
            typeof reject === 'function' && reject(res.msg || res.data)
          }
        },
        error: err => {
          // console.log(err)
          typeof reject === 'function' && reject(err.statusText)
        }
      })
    })
  }
  doLogin(){
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  }
  getUrlParam(name) {
    // param=123&param1=456
    let queryString = window.location.search.split('?')[1] || '';
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let result = queryString.match(reg);
    // result: ['param=123', '', '123', '&']
    return result ? decodeURIComponent(result[2]) : null
  }
  errorTips(errMsg) {
    alert(errMsg || 'something wrong...')
  }
  setStorage(name, data) {
    let dataType = typeof data;
    if(dataType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data));
    } else if(['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
      window.localStorage.setItem(name, data);
    } else {
      alert('该类型不能用于本地存储')
    }
  }
  getStorage(name) {
    let data = window.localStorage.getItem(name);
    if(data) {
      return JSON.parse(data);
    } else {
      return '';
    }
  }
  removeStorage(name) {
    window.localStorage.removeItem(name);
  }
}

export default MUtil
