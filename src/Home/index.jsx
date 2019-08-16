/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import { enquireScreen } from 'enquire-js';


import Banner1 from './Banner1';
import Content0 from './Content0';
import Content5 from './Content5';
import Content3 from './Content3';
import Footer1 from './Footer1';

import {
  // Nav00DataSource,
  Banner10DataSource,
  Content00DataSource,
  Content50DataSource,
  Content30DataSource,
  Footer10DataSource,
} from './data.source';
import './less/antMotionStyle.less';
import { getPics } from './ajax';


let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

// const { location } = window;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      Banner10DataSource:{
        wrapper: { className: 'banner1' },
        BannerAnim:{
          children:[]
        }
      },
      Content00DataSource:{
        wrapper: { className: 'home-page-wrapper content0-wrapper' },
        page: { className: 'home-page content0' },
        OverPack: { playScale: 0.3, className: '' },
        titleWrapper: {
          className: 'title-wrapper',
          children: [{ name: 'title', children: '产品与服务' }],
        },
        block:{
          className: 'block-wrapper',
          children:[]
        }
      }
      // show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }

  componentDidMount() {
    // 适配手机屏幕;

    console.log(this.props)
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    /* 如果不是 dva 2.0 请删除 start */
    // if (location.port) {
    //   // 样式 build 时间在 200-300ms 之间;
    //   setTimeout(() => {
    //     this.setState({
    //       show: true,
    //     });
    //   }, 500);
    // }
    /* 如果不是 dva 2.0 请删除 end */
    getPics(1).then((res) => {
      if(res && res.page1){
        const newData = res.page1.banner.map((item,index)=>{
          return {
            name: `elem${index}`,
            BannerElement: { className: 'banner-user-elem' },
            textWrapper: { className: 'banner1-text-wrapper' },
            bg: { className: 'bg bg0' },
            imgSrc:item.imgSrc,
            title: {
              className: 'banner1-title',
              children:
                'https://zos.alipayobjects.com/rmsportal/HqnZZjBjWRbjyMr.png',
            },
            content: {
              className: 'banner1-content',
              children: '一个高效的页面动画解决方案',
            },
            button: { className: 'banner1-button', children: 'Learn More' },
          }
        })

        const newMiddleData = res.page1.middle.map((item,index)=>{
          return {
            name: 'block0',
            className: 'block',
            md: 8,
            xs: 24,
            children: {
              icon: {
                className: 'icon',
                children:`/app/${item.imgSrc}`,
              },
              title: { className: 'content0-title', children: '一站式业务接入' },
              content: { children: '支付、结算、核算接入产品效率翻四倍' },
            },
          }
        })

        this.setState({
          Banner10DataSource:{
            wrapper: { className: 'banner1' },
            BannerAnim:{
              children:newData
            }
          },
          Content00DataSource:{
            wrapper: { className: 'home-page-wrapper content0-wrapper' },
            page: { className: 'home-page content0' },
            OverPack: { playScale: 0.3, className: '' },
            titleWrapper: {
              className: 'title-wrapper',
              children: [{ name: 'title', children: '产品与服务' }],
            },
            block:{
              className: 'block-wrapper',
              children:newMiddleData
            }
          }
        })
      }
    })

  }

  render() {

    const children = [
      <Banner1
        id="Banner1_0"
        key="Banner1_0"
        dataSource={this.state.Banner10DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content0
        id="Content0_0"
        key="Content0_0"
        dataSource={this.state.Content00DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content5
        id="Content5_0"
        key="Content5_0"
        dataSource={Content50DataSource}
        isMobile={this.state.isMobile}
      />,
      // <Content3
      //   id="Content3_0"
      //   key="Content3_0"
      //   dataSource={Content30DataSource}
      //   isMobile={this.state.isMobile}
      // />,
      // <Footer1
      //   id="Footer1_0"
      //   key="Footer1_0"
      //   dataSource={Footer10DataSource}
      //   isMobile={this.state.isMobile}
      // />,
    ];
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {/* 如果不是 dva 2.0 替换成 {children} start */}
        {children}
        {/* 如果不是 dva 2.0 替换成 {children} end */}
      </div>
    );
  }
}

export default Home