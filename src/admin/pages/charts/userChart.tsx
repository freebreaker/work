import * as React from 'react';
import {
  Breadcrumb, Tabs, Dropdown, Icon, Menu, DatePicker
} from 'antd';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";
import axios from '../../util/Axios';
import { LocaleProvider } from 'antd';

import zh_CN from 'antd/lib/locale-provider/zh_CN';

import 'moment/locale/zh-cn';

import moment from 'moment'

const { TabPane } = Tabs;

const { MonthPicker, } = DatePicker;


export default class UserChart extends React.Component {

  public state = {
    data: [],
    mdata: [],
    tabKey: "1",
    defaultYear:moment().format("YYYY"),
    defaultMonth:moment().format("YYYY-MM")
  }

  public componentDidMount() {
    const that = this
    const {defaultYear} = this.state
    axios({
      method: "get",
      url: `/chart/mlist?year=${defaultYear}`
    }).then((res:any) => {
      if (res) {
        const xData = res.monthData.map((item: any, index: number) => {
          return {
            month: index + 1 + "月",
            value: item || 0
          }
        })
        that.setState({
          data: xData
        })
      }
    })
  }

  public changeYear = (year: string) => {
    const that = this
    axios({
      method: "get",
      url: `/chart/mlist?year=${year}`
    }).then((res:any) => {
      if (res) {
        const xData = res.monthData.map((item: any, index: number) => {
          return {
            month: index + 1 + "月",
            value: parseInt(item, 10) || 0
          }
        })
        console.log(xData)
        that.setState({
          data: xData
        })
      }
    })
  }

  public changeMonth = (date: moment.Moment, dateString: string) => {
    const that = this
    axios({
      method: "get",
      url: `/chart/dlist?month=${dateString}`
    }).then((res:any) => {
      if (res) {
        const mData = res.monthData.map((item: any, index: number) => {
          return {
            month: index + 1 + "号",
            value: parseInt(item, 10) || 0
          }
        })
        that.setState({
          mdata: mData
        })
      }
    })
  }

  public changeTab = (key:string)=>{
    const that = this
    const {defaultMonth} = this.state
    if(key === "2"){
      axios({
        method:"get",
        url: `/chart/dlist?month=${defaultMonth}`
      }).then((res:any)=>{
        if (res) {
          const mData = res.monthData.map((item: any, index: number) => {
            return {
              month: index + 1 + "号",
              value: parseInt(item, 10) || 0
            }
          })
          that.setState({
            mdata: mData
          })
        }
      })
    }
    this.setState({
      tabKey:key
    })
  }

  public render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <div onClick={this.changeYear.bind(this, "2019")}>
            2019年
          </div>
        </Menu.Item>
      </Menu>
    )

    const operations = <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" href="#">
        选 择 年 份 <Icon type="down" />
      </a>
    </Dropdown>;

    const monthOperations =
      <LocaleProvider locale={zh_CN}>
        <MonthPicker
          onChange={this.changeMonth}
          defaultValue={moment(moment().format(), 'YYYY/MM')}
          size="default" placeholder="选 择 月 份" />
      </LocaleProvider>

    const { data, mdata, tabKey } = this.state
    const cols = {
      value: {
        tickInterval: 1
      }
    };
    const cols2 = {
      value: {
        tickInterval: 1
      }
    };
    return (
      <div>
        <Breadcrumb style={{ textAlign: "left", marginBottom: 25 }}>
          <Breadcrumb.Item>统计报表</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">用户报表</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Tabs
          defaultActiveKey={tabKey}
          tabBarExtraContent={tabKey === "1" ? operations : monthOperations} size="large" onChange={this.changeTab}>
          <TabPane tab="年" key="1">
            <div>
              <Chart height={500} data={data} scale={cols} forceFit={true}>
                <Axis name="month" />
                <Axis name="value" />
                <Tooltip
                  crosshairs={{
                    type: "y"
                  }}
                />
                <Geom type="interval" position="month*value" />
              </Chart>
            </div>
          </TabPane>
          <TabPane tab="月" key="2">
            <div>
              <Chart height={500} data={mdata} scale={cols2} forceFit={true}>
                <Axis name="month" />
                <Axis name="value" />
                <Tooltip
                  crosshairs={{
                    type: "y"
                  }}
                />
                <Geom type="interval" position="month*value" />
              </Chart>
            </div>

          </TabPane>
        </Tabs>
      </div>
    );
  }
}
