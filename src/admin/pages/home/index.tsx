import * as React from 'react';
import { Suspense, lazy } from 'react'
import { Link, Route } from 'react-router-dom';
import { Layout, Menu, Icon, Button, message, Input, Dropdown, Avatar } from 'antd';
import './index.less';
import axios from '../../util/Axios';
import { PictureList } from '../picture';
import { AdvertisementList } from '../advertisement';
import { PersonalRound } from '../personalRound';

import bg from "../../images/main/icon_logo2.png"

// const PetDivide = lazy(() => import("../divide/petDivide"))
// const GoodDivide = lazy(() => import("../divide/goodDivide"))
// const ServiceDivide = lazy(() => import("../divide/serviceDivide"))
// const PetAuditPage = lazy(() => import('../audit/petAudit'))
// const AppUpload = lazy(() => import('../appUpload'))
// const ProductAuditPage = lazy(() => import('../audit/productAudit'))
// const CompanyAuditPage = lazy(() => import("../audit/companyAudit"))
// const RolePage = lazy(() => import("../auth/role"))
// const PasswordPage = lazy(() => import('../user/password'))
// const UserChart = lazy(() => import('../charts/userChart'))
// const VaccineDivide = lazy(() => import('../divide/vaccine'))
const AdminUsersPage = lazy(() => import('../auth/adminusers'))
// const UserList = lazy(() => import('../user/userlist'))
// const AuthentList = lazy(() => import("../user/authentList"))
// const UserAuditPage = lazy(() => import("../audit/userAudit"))
// const ServiceAuditPage = lazy(() => import('../audit/serviceAudit'))
// const BusinessRound = lazy(() => import('../businessRound'))
// const RepellantDivide = lazy(() => import('../divide/repellantDivide'))

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
    axios({
      method: "post",
      url: "/logout",
    }).then((res: any) => {
      if (res.status === 200) {
        message.success(res.msg)
        localStorage.clear()
        this.props.history.push('/')
      }
    })
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
                key="sub2"
                title={<span><Icon type="paper-clip" /><span>用户管理</span></span>}
              >
                <Menu.Item key="6" onClick={() => this.setSelectedKeyToLocal("6")}>
                  <Link to={{
                    pathname: `/admin/home/adminusers`
                  }} >用户列表</Link>
                </Menu.Item>
              </SubMenu>
                  {/* <SubMenu
                key="sub1"
                title={<span><Icon type="audit" /><span>审核管理</span></span>}
              >
                <Menu.Item key="1" onClick={() => this.setSelectedKeyToLocal("1")}>
                  <Link to="/admin/home/petAudit/1">宠物审核</Link>
                </Menu.Item>
                <Menu.Item key="2" onClick={() => this.setSelectedKeyToLocal("2")}>
                  <Link to="/admin/home/productAudit/1">商品审核</Link>
                </Menu.Item>
                <Menu.Item key="3" onClick={() => this.setSelectedKeyToLocal("3")}>
                  <Link to="/admin/home/userAudit/1">用户认证审核</Link>
                </Menu.Item>
                <Menu.Item key="4" onClick={() => this.setSelectedKeyToLocal("4")}>
                  <Link to="/admin/home/companyAudit/1">企业认证审核</Link>
                </Menu.Item>
                <Menu.Item key="5" onClick={() => this.setSelectedKeyToLocal("5")}>
                  <Link to="/admin/home/serviceAudit/1">服务审核</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={<span><Icon type="paper-clip" /><span>分类管理</span></span>}
              >
                <Menu.Item key="6" onClick={() => this.setSelectedKeyToLocal("6")}>
                  <Link to={{
                    pathname: `/admin/home/petDivide`
                  }} >宠物分类</Link>
                </Menu.Item>
                <Menu.Item key="7" onClick={() => this.setSelectedKeyToLocal("7")}>
                  <Link to="/admin/home/goodDivide">商品分类</Link>
                </Menu.Item>
                <Menu.Item key="8" onClick={() => this.setSelectedKeyToLocal("8")}>
                  <Link to="/admin/home/serviceDivide">服务分类</Link>
                </Menu.Item>
                <Menu.Item key="9" onClick={() => this.setSelectedKeyToLocal("9")}>
                  <Link to="/admin/home/vaccineDivide">疫苗分类</Link>
                </Menu.Item>
                <Menu.Item key="10" onClick={() => this.setSelectedKeyToLocal("10")}>
                  <Link to="/admin/home/repellantDivide">驱虫分类</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={<span><Icon type="upload" /><span>App上传</span></span>}
              >
                <Menu.Item key="11" onClick={() => this.setSelectedKeyToLocal("11")}>
                  <Link to="/admin/home/app">安卓</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={<span><Icon type="user" /><span>后台管理</span></span>}
              >
                <Menu.Item key="12" onClick={() => this.setSelectedKeyToLocal("12")}>
                  <Link to="/admin/home/role">角色分配</Link>
                </Menu.Item>
                <Menu.Item key="13" onClick={() => this.setSelectedKeyToLocal("13")}>
                  <Link to="/admin/home/adminusers">用户管理</Link>
                </Menu.Item>
                <Menu.Item key="14" onClick={() => this.setSelectedKeyToLocal("14")}>
                  <Link to="/admin/home/password">修改密码</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub5"
                title={<span><Icon type="usergroup-add" /><span>用户管理</span></span>}
              >
                <Menu.Item key="15" onClick={() => this.setSelectedKeyToLocal("15")}>
                  <Link to="/admin/home/userlist/1">用户列表</Link>
                </Menu.Item>
                {/* <Menu.Item key="16">
                  <Link to="/admin/home/authentlist">用户</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub6"
                title={<span><Icon type="line-chart" /><span>统计报表</span></span>}
              >
                <Menu.Item key="17" onClick={() => this.setSelectedKeyToLocal("17")}>
                  <Link to="/admin/home/userchart">用户统计</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub7"
                title={<span><Icon type="environment" /><span>商圈管理</span></span>}
              >
                <Menu.Item key="18" onClick={() => this.setSelectedKeyToLocal("18")}>
                  <Link to="/admin/home/businessRound">商圈发布</Link>
                </Menu.Item>
              </SubMenu>
              {/* <SubMenu
                key="sub8"
                title={<span><Icon type="file-image" /><span>图片管理</span></span>}
              >
                <Menu.Item key="19" onClick={() => this.setSelectedKeyToLocal("19")}>
                  <Link to="/admin/home/picture/1">公有云图片</Link>
                </Menu.Item>
              </SubMenu> */}
                  < SubMenu
                key="sub9"
                title={<span><Icon type="notification" /><span>广告管理</span></span>}
              >
                <Menu.Item key="20" onClick={() => this.setSelectedKeyToLocal("20")}>
                  <Link to="/admin/home/advertisement/1">广告列表</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub10"
                title={<span><Icon type="trademark" /><span>圈子管理</span></span>}
              >
                <Menu.Item key="21" onClick={() => this.setSelectedKeyToLocal("21")}>
                  <Link to="/admin/home/round/1">圈子列表</Link>
                </Menu.Item>
              </SubMenu> */}
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
              <div style={{
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
              </div>
              <div style={{ width: "12%", display: "flex", justifyContent: "space-around" }}>
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" href="#" style={{ display: "flex", alignItems: "center" }}>
                    <Avatar icon="user" />
                    <span style={{ marginLeft: 8, color: "black" }}>用户信息</span>
                  </a>
                </Dropdown>
              </div>

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
