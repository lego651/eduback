import React from 'react'

import MUtil from 'util/mm.js'
import User from 'service/user-service.jsx'
import './index.css'

const _mm = new MUtil()
const _user = new User()

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/'
    }
  }
  componentWillMount() {
    document.title = 'Login - MMallAdmin'
  }
  onUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }
  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }
  onInputChange(e) {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    this.setState({
      [inputName]: inputValue
    })
  }
  onInputKeyUp(e) {
    if(e.keyCode === 13) {
      this.onSubmit()
    }
  }
  onSubmit(e) {
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    }
    let checkResult = _user.checkLoginInfo(loginInfo)
    // 验证通过
    if(checkResult.status) {
      _user.login(loginInfo)
      .then((res) => {
        // console.log(this.state.redirect)
        // localStorage.setItem('userInfo', JSON.stringify(res));
        _mm.setStorage('userInfo', res);
        this.props.history.push(this.state.redirect)
      }, (errMsg) => {
        _mm.errorTips(errMsg)
      })
    } else { // 验证不通过
        _mm.errorTips(checkResult.msg);
    }
  }
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading"> 欢迎登录 </div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <label htmlFor="username"> 用户名 </label>
                <input type="text"
                       className="form-control"
                       id="username"
                       placeholder="输入用户名"
                       name="username"
                       onKeyUp = {e => this.onInputKeyUp(e)}
                       onChange={e => this.onInputChange(e)} />
              </div>
              <div className="form-group">
                <label htmlFor="password"> 密码 </label>
                <input type="password"
                       className="form-control"
                       id="password"
                       placeholder="输入邮件"
                       name="password"
                       onKeyUp = {e => this.onInputKeyUp(e)}
                       onChange={e => this.onInputChange(e)} />
              </div>
              <button className="btn btn-lg btn-block btn-primary"
                      onClick={e=>{this.onSubmit(e)}}>
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login
