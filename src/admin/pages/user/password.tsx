import * as React from 'react';
import {
  Breadcrumb, Form, Input, Button, message
} from 'antd';
import axios from '../../util/Axios';

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class PasswordPageWrap extends React.Component<any, any> {
  public state = {
    oldpassword: "",
    newpassword: "",
    newpassword2: ""
  }
  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: { oldpassword: string, newpassword: string, newpassword2: string }) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios({
          method: "post",
          url: `/user/password`,
          data: {
            oldpassword: values.oldpassword,
            newpassword: values.newpassword,
            newpassword2: values.newpassword2
          }
        }).then((res: any) => {
          if (res.success) {
            localStorage.setItem("token", res.token)
            message.success(res.msg)
            setTimeout(() => {
              window.location.reload()
            }, 500);
          } else {
            message.error(res.msg)
          }
        })
      }
    });
  };

  public handleDifferPassword = (rule: any, value: any, callback: any) => {
    const { getFieldValue } = this.props.form
    if (value && value === getFieldValue('oldpassword')) {
      callback('不可使用旧密码！')
    }
    callback()
  }

  public handleConfirmPassword = (rule: any, value: any, callback: any) => {
    const { getFieldValue } = this.props.form
    if (value && value !== getFieldValue('newpassword')) {
      callback('两次输入不一致！')
    }
    callback()
  }

  public render() {
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
    };
    const { getFieldDecorator, getFieldsError, } = this.props.form;
    const { oldpassword, newpassword, newpassword2 } = this.state

    return (
      <div>
        <Breadcrumb style={{ textAlign: "left", marginBottom: 25 }}>
          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">修改密码</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="旧密码" hasFeedback={true}>
            {getFieldDecorator('oldpassword', {
              initialValue: "",
              setFieldsValue: oldpassword,
              rules: [{ required: true, message: '请输入旧密码!' }],
            })(
              <Input placeholder="旧密码" onChange={(e: any) => this.setState({ oldpassword: e.target.value })} />
            )}
          </Form.Item>
          <Form.Item label="新密码">
            {getFieldDecorator('newpassword', {
              initialValue: "",
              setFieldsValue: newpassword,
              rules: [
                {
                  required: true, message: '请输入新密码!'
                },
                {
                  validator: this.handleDifferPassword
                }
              ],
            })(
              <Input.Password placeholder="新密码" onChange={(e: any) => this.setState({ newpassword: e.target.value })} />
            )}
          </Form.Item>
          <Form.Item label="确认新密码">
            {getFieldDecorator('newpassword2', {
              initialValue: "",
              setFieldsValue: newpassword2,
              rules: [
                {
                  required: true, message: '再次输入新密码!'
                },
                {
                  validator: this.handleConfirmPassword
                }],
            })(
              <Input.Password placeholder="再次输入新密码" onChange={(e: any) => this.setState({ newpassword2: e.target.value })} />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" block={true} htmlType="submit"
              className="login-form-button" style={{ marginLeft: "50%" }}
              disabled={hasErrors(getFieldsError())}>
              修 改 密 码
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const PasswordPage = Form.create({ name: 'validate_other' })(PasswordPageWrap);

export default PasswordPage