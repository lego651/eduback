import MUtil from 'util/mm.js'
const _mm = new MUtil()

class User {
  login(loginInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/user/login.do',
      data: loginInfo
    })
  }
  checkLoginInfo(loginInfo) {
    // 错误的username
    let username = $.trim(loginInfo.username);
    let password = $.trim(loginInfo.password);
    if(username.length === 0) {
      return {
        status: false,
        msg: '用户名不能为空!'
      }
    }
    if(password.length === 0) {
      return {
        status: false,
        msg: '密码不能为空!'
      }
    }
    return {
      status: true,
      msg: '验证通过'
    }
  }
  logout() {
    return _mm.request({
      type: 'post',
      url: '/user/logout.do',
    })
  }
  getUserList(pageNum) {
    return _mm.request({
      type: 'post',
      url: '/manage/user/list.do',
      data: {
        pageNum: pageNum
      }
    })
  }
}

export default User
