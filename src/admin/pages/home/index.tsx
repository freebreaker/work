import * as React from 'react';
import { Suspense, lazy } from 'react'
import { Link, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Button, message, Input, Dropdown, Avatar } from 'antd';
import './index.less';
import axios from '../../util/Axios';

import bg from "../../images/main/icon_logo2.png"
import Message from '../message';
import VideoPage from '../videoRecharge';

const AdminUsersPage = lazy(() => import('../auth/adminusers'))
const FirstPageBanner = lazy(() => import('../bannerRecharge'))

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/admin/home/password">修改密码</Link>
    </Menu.Item>
    {/* <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        用户信息
      </a>
    </Menu.Item> */}
  </Menu>
);

export class AdminHome extends React.Component<any>{

  public rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9', "sub10", "sub11"];

  public openKey = localStorage.getItem("openKeys")

  public state = {
    collapsed: false,
    openKeys: this.openKey ? [this.openKey] : ["sub1"],
  }

  public toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  public logout = () => {
    // axios({
    //   method: "post",
    //   url: "/logout",
    // }).then((res: any) => {
    //   if (res.status === 200) {
    //     message.success(res.msg)
    //     localStorage.clear()
    //     this.props.history.push('/admin')
    //   }
    // })
    localStorage.clear()
    // this.props.history.push('/')
    window.location.href = '/'
  }

  public onOpenChange = (openKeys: any) => {

    const latestOpenKey = openKeys.find((key: string) => this.state.openKeys.indexOf(key) === -1);

    if (latestOpenKey) {
      localStorage.setItem("openKeys", latestOpenKey)
    }

    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };


  public setSelectedKeyToLocal = (key: string) => {
    localStorage.setItem("key", key)
  }

  public debounce = (fn: () => void) => {
    let time: any = null
    return () => {
      clearTimeout(time)
      time = setTimeout(() => {
        fn()
      }, 1500);
    }
  }

  public test = () => {
    console.log(123)
    // let time
  }

  public render() {
    // const page = 1
    return (
      <div id="components-layout">
        <Layout>
          <Sider
            // theme="light"
            trigger={null}
            collapsible={true}
            collapsed={this.state.collapsed}
          >
            <img src={bg} style={{ margin: "12px 0", height: "auto" }} className="logo" />
            <Menu theme="dark" mode="inline"
              defaultSelectedKeys={[localStorage.getItem("key") || "1"]}
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
            >
              <SubMenu
                key="sub1"
                title={<span><Icon type="paper-clip" /><span>后台用户</span></span>}
              >
                <Menu.Item key="1" onClick={() => this.setSelectedKeyToLocal("1")}>
                  <Link to={{
                    pathname: `/admin/home/adminusers`
                  }} >用户列表</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={<span><Icon type="paper-clip" /><span>图片管理</span></span>}
              >
                <Menu.Item key="7" onClick={() => this.setSelectedKeyToLocal("7")}>
                  <Link to={{
                    pathname: `/admin/home/picture1`
                  }} >首页图片</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={<span><Icon type="paper-clip" /><span>视频管理</span></span>}
              >
                <Menu.Item key="18" onClick={() => this.setSelectedKeyToLocal("18")}>
                  <Link to={{
                    pathname: `/admin/home/video`
                  }} >视频</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub5"
                title={<span><Icon type="paper-clip" /><span>留言管理</span></span>}
              >
                <Menu.Item key="8" onClick={() => this.setSelectedKeyToLocal("8")}>
                  <Link to={{
                    pathname: `/admin/home/message`
                  }} >留言列表</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ background: '#fff', padding: "0 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Icon
                className="trigger"
                style={{ fontSize: 20 }}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              {/* <div style={{
                width: "80%",
                textAlign: "left"
              }}>
                <Search
                  placeholder="搜索"
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                  onChange={this.debounce(this.test)}
                // enterButton={true}
                />
              </div> */}
              {/* <div style={{ width: "12%", display: "flex", justifyContent: "space-around" }}>
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" href="#" style={{ display: "flex", alignItems: "center" }}>
                    <Avatar icon="user" />
                    <span style={{ marginLeft: 8, color: "black" }}>用户信息</span>
                  </a>
                </Dropdown>
              </div> */}

              <div>
                <Button type="primary" className="login-form-button" onClick={this.logout.bind(this)}>
                  登 出
                  </Button>
              </div>
            </Header>
            <Content style={{
              margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
            }}
            >
              <Suspense fallback={null}>
                {/* <Route path="/admin/home/petAudit/:page" component={PetAuditPage} />
                <Route path="/admin/home/productAudit/:page" component={ProductAuditPage} />
                <Route path="/admin/home/userAudit/:page" component={UserAuditPage} />
                <Route path="/admin/home/companyAudit/:page" component={CompanyAuditPage} />
                <Route path="/admin/home/serviceAudit/:page" component={ServiceAuditPage} />
                <Route path="/admin/home/petDivide" component={PetDivide} />
                <Route path="/admin/home/goodDivide" component={GoodDivide} />
                <Route path="/admin/home/serviceDivide" component={ServiceDivide} />
                <Route path="/admin/home/vaccineDivide" component={VaccineDivide} />
                <Route path="/admin/home/repellantDivide" component={RepellantDivide} />
                <Route path="/admin/home/app" component={AppUpload} />
                <Route path="/admin/home/role" component={RolePage} /> */}
                <Route path="/admin/home/adminusers" component={AdminUsersPage} />
                <Route path="/admin/home/picture1" component={FirstPageBanner} />
                <Route path="/admin/home/video" component={VideoPage} />
                <Route path="/admin/home/message" component={Message} />
                {/* <Route path="/admin/home/password" component={PasswordPage} />
                <Route path="/admin/home/userlist/:page" component={UserList} />
                <Route path="/admin/home/authentlist" component={AuthentList} />
                <Route path="/admin/home/userchart" component={UserChart} />
                <Route path="/admin/home/businessRound" component={BusinessRound} />
                <Route path="/admin/home/picture/:page" component={PictureList} />
                <Route path="/admin/home/advertisement/:page" component={AdvertisementList} />
                <Route path="/admin/home/round/:page" component={PersonalRound} /> */}
              </Suspense>
            </Content>
          </Layout>
        </Layout>
      </div >

    );
  }
}
