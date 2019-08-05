import * as React from 'react';
import {
    Icon, Input, Checkbox, Form
} from 'antd';

interface ILoginBoxProps {
    usernameChange:(e:any)=>void,
    passwordChange:(e:any)=>void
}


export class LoginBox extends React.Component<ILoginBoxProps> {
    public render() {
        return (
            <Form className="login-form">
                <img src={require('../../images/login/icon_logo.png')} style={{margin:16}}/>
                <Form.Item>
                    <Input onChange={this.props.usernameChange} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                </Form.Item>
                <Form.Item>
                    <Input onChange={this.props.passwordChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                </Form.Item>
                <div className="check">
                    <Checkbox style={{color:"white"}}>记住密码</Checkbox>
                    <a className="login-form-forgot" href="/">忘记密码？</a>
                </div>
                <div>
                    {this.props.children}
                </div>
            </Form>
        );
    }
}
