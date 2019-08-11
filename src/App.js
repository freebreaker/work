import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import { enquireScreen } from 'enquire-js';
import Header from './Home/Nav0';
import Footer from './Home/Footer1';
import Home from './Home';
import Page2 from './page2';
import { Form, Button, Input, Icon ,message } from 'antd';

import {
  Nav00DataSource,
  Footer10DataSource,
} from './Home/data.source.js';
import AdminPage from './admin/App.tsx';
import { hasErrors } from './admin/util/hasErrors';
import { apiAddMessage } from './admin/pages/api';

const { TextArea } = Input;

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class AppWrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      ShowMsgBoxTitle: false
    };
  }
  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
  }

  change = ()=>{
    this.setState({
      ShowMsgBoxTitle:!this.state.ShowMsgBoxTitle
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        apiAddMessage(values.message,values.name,values.phone).then((res)=>{
          if(res){
            message.success("发送成功！")
            this.props.form.setFieldsValue({
              message:"",
              name:"",
              phone:""
          });
          }else{
            message.error("发送失败")
          }
        })
      }
    });
  };

  render() {
    const url = window.location.href;

    const { getFieldDecorator } = this.props.form;


    const ShowHeader = url.indexOf("admin") === -1;

    const ShowMsgBoxTitle = this.state.ShowMsgBoxTitle
    return (
      <Router>
        <div>
          {
            ShowHeader ?
              <Header dataSource={Nav00DataSource} isMobile={this.isMobile} />
              : ""
          }
          <Route exact path="/" component={Home} />
          <Route exact path="/page2" component={Page2} />
          <Route path="/admin" component={AdminPage} />
          {
            ShowHeader ?
              <Footer dataSource={Footer10DataSource} isMobile={this.isMobile} />
              : ""
          }
        </div>
        {
          ShowHeader ?
            <div style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: 240,
              // height: 314,
              background: "#ededed",
              boxShadow: "0 6px 100px 0 rgba(0,0,0,.35)",
            }}>
              {
                ShowMsgBoxTitle ?
                    <div style={{
                      height: 40,
                      color: "white",
                      background: "#1890ff",
                      display: "flex",
                      padding: "0 15px",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <span>请您留言</span>
                      <span onClick={this.change.bind(this)} style={{cursor:"pointer"}}>
                      <Icon type="plus-square" />
                      </span>
                    </div>
                  :
                  <Form labelCol={{ span: 5 }} wrapperCol={{ span: 22 }} onSubmit={this.handleSubmit}>
                    <div style={{
                      height: 40,
                      color: "white",
                      background: "#1890ff",
                      display: "flex",
                      padding: "0 15px",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <span>请您留言</span>
                      <span onClick={this.change.bind(this)} style={{cursor:"pointer",fontSize:16}}>一</span>
                    </div>
                    <Form.Item label="" style={{ display: "flex", justifyContent: "space-between", marginBottom: 0 }}>
                      {getFieldDecorator('message', {
                        rules: [{ required: true, message: '请留言' }],
                      })(
                        <TextArea rows={5}
                          style={{
                            margin: "10px 0"
                          }}
                          placeholder="请在此输入留言内容，我们会尽快与您联系。（必填）" />
                      )}
                    </Form.Item>
                    <Form.Item label="" style={{ display: "flex", justifyContent: "space-between", marginBottom: 0 }}>
                      {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请填写姓名' }],
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="姓名 （必填）"
                        />
                      )}
                    </Form.Item>
                    <Form.Item label="" style={{ display: "flex", justifyContent: "space-between", marginBottom: 0 }}>
                      {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请填写正确的手机号' , pattern:/^1[0-9]{10}$/}],
                      })(
                        <Input
                          prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="手机号 （必填）"
                        />
                      )}
                    </Form.Item>
                    <div
                      style={{
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#ededed',
                        textAlign: 'right',
                        borderTopColor: "white"
                      }}
                    >
                      <Button type="primary" htmlType="submit" disabled={hasErrors(this.props.form.getFieldsError())}>
                        发送
                </Button>
                    </div>
                  </Form>
              }

            </div>
            : ""
        }
      </Router>
    );
  }
}

const App = Form.create({ name: 'register' })(AppWrap);

export default App;