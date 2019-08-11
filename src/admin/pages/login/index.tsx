import * as React from 'react';
import './index.less';
import { LoginBox } from './loginBox';
import {
  Button, message
} from 'antd';
import axios from '../../util/Axios';

export class LoginPage extends React.Component<any>{
  public state = {
    username: "2",
    password: "2",
    userQuery: false
  };

  public usernameChange = (e: any) => {
    e.preventDefault()
    this.setState({
      username: e.target.value
    })
  }

  public passwordChange = (e: any) => {
    e.preventDefault()
    this.setState({
      password: e.target.value
    })
  }

  public loginMutation = () => {
    const { username, password } = this.state
    axios({
      method: "post",
      url: "/login",
      data: {
        name: username,
        pwd: password
      }
    }).then((res: any) => {
      console.log(res)
      if(res.msg === "登录成功"){
        message.success("登录成功")
        localStorage.setItem("token",res.token)
        localStorage.setItem("uploadToken",res.uploadToken)
        localStorage.setItem("adminId",res.adminId)
        this.props.history.push('/admin/home/adminusers')
      }else{
        message.error(res.msg)
      }

    })
  }

  public render() {
    return (
      <div className="container">
        <LoginBox usernameChange={this.usernameChange} passwordChange={this.passwordChange}>
        
          <Button type="default" className="login-form-button" onClick={this.loginMutation.bind(this)}>
            登 录
          </Button>
        </LoginBox>
      </div>
    );
  }
}
