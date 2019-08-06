import * as React from 'react';
import {
  Table, message, Breadcrumb ,Modal ,Typography ,Tag
} from 'antd';
import axios from '../../../util/Axios';
import {  ServiceAuditMsgModal } from './serviceAuditMsgModal';
import moment from 'moment'
import { apiGetServiceAuditList } from '../../api';
import { AuditBox } from '../../../components/AuditBox';

const { Paragraph } = Typography;

// const auditStatus = ["待审核", "审核通过", "审核驳回"]

export default class ServiceAuditPage extends React.Component<any, any> {
  public state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    filteredInfo: null,
    sortedInfo: {
      order: "",
    },
    tableData: [],
    serviceAuthId: 0,
    audit: 0,
    productData: {
      id: "",
      name: "",
      title: "title",
      serviceKind: "",
      price:0,
      icon:"",
      content: "",
      contact: "",
      phone: "",
      streetArea: "",
    },
    productRecords: [],
    modalPetDetailShow: false,
    total: 0
  };



  public getAuditList = (page: number, size: number, status: string[]) => {
    const That = this
    apiGetServiceAuditList(page, size, status).then((res: any) => {
      if (res.data && res.data.length > 0) {
        const tableData = res.data.map((item: any, index: number) => {
          return {
            key: item.id,  // key 应带对应data id 
            name: item.userId ? item.userId.nickname : "----",
            publisher: item.userId ? item.userId.username : "----",
            serviceKind: item.typeId ? item.typeId.name : "----",
            price: item.price ? item.price : "----",
            title: item.title ? item.title : "----",
            content: item.content ? item.content : "----",
            status: item.status,
            creatTime: item.ct ? item.ct : "----",
            modifiedTime: item.mt ? moment(parseInt(item.mt, 10)).format('YYYY-MM-DD H:mm:ss') : "----",
            operation: item.id
          }
        })
        That.setState({
          "tableData": tableData,
          resTableData: res.data,
          total: res.total
        })
      }else{
        That.setState({
          "tableData": [],
          resTableData: res.data,
          total: res.total
        })
      }
    })
  }

  public componentDidMount() {
    // console.log(this.props.match.params)
    const { page } = this.props.match.params
    this.getAuditList(page, 10, ["0", "1", "2",'3'])
  }

  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  public handleChange = (pagination: any, filters: any, sorter: any) => {
    this.props.history.push(`/home/serviceAudit/${pagination.current}`)
    console.log(filters.status)
    this.getAuditList(pagination.current, pagination.pageSize, filters.status && filters.status.length > 0 ? filters.status : ["0", "1", "2","3"])
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  public modalPetDetail = (serviceAuthId: number, serviceId: string, serviceKind: string, audit: number) => {
    axios({
      method: "get",
      url: `/detail/service?id=${serviceId}`,
    }).then((res: any) => {
      if (res) {
        this.setState({
          modalPetDetailShow: true,
          "serviceAuthId": serviceAuthId,
          "audit": audit,
          productData: {
            id: res.id,
            name: res.name,
            title: res.title,
            "serviceKind": serviceKind,
            price: res.price ? res.price : "面议",
            content: res.content ? res.content : "----",
            contact: res.userId ? res.userId.username : "----",
            phone: res.userId ? res.userId.phone : "----",
            streetArea: res.area ? res.area : "暂无",
            icon:res.icon?res.icon:"----"
          },
          productRecords: res.records?res.records:[]
        })
      } else {
        message.error("数据出错了")
      }
    })
  }

  public render() {

    const { selectedRowKeys, serviceAuthId, audit, productRecords }: any = this.state;

    let { filteredInfo, sortedInfo }: any = this.state;

    filteredInfo = filteredInfo || {};

    sortedInfo = sortedInfo || {};

    const columns = [{
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '发布人',
      dataIndex: 'publisher',
      key: 'publisher',
    }, {
      title: '宠物种类',
      dataIndex: 'serviceKind',
      key: 'serviceKind',
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '服务标题',
      dataIndex: 'title',
      key: 'title',
      render: (text: any, record: any) => {
        return (
          <div onClick={()=>{
            Modal.success({
              title:"服务标题",
              content:record.title,
              okText:"确定"
            })
          }} style={{cursor:"pointer"}}>
            <Paragraph ellipsis={true} style={{width:100}}>
              {
                record.title
              }
            </Paragraph>
          </div>

        )
      }
    }, {
      title: '服务内容',
      dataIndex: 'content',
      key: 'content',
      render: (text: any, record: any) => {
        return (
          <div onClick={()=>{
            Modal.success({
              title:"认证内容",
              content:record.content,
              okText:"确定"
            })
          }} style={{cursor:"pointer"}}>
            <Paragraph ellipsis={true} style={{width:150}}>
              {
                record.content
              }
            </Paragraph>
          </div>

        )
      }
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '待审核', value: "0" },
        { text: '审核通过', value: "1" },
        { text: '审核驳回', value: "2" },
        { text: '手动下架', value: "3" },
      ],
      // filteredValue: filteredInfo.age || null,
      // onFilter: (value: string, record: any) => {
      //   console.log(record.status.toString(),value)
      //   return record.status.toString().includes(value)
      // },
      render: (text: any, record: any) => {
        return (
          <AuditBox type={record.status} />
          // <span>{auditStatus[record.status]}</span>
        )
      }
    }, {
      title: '创建时间',
      dataIndex: 'creatTime',
      key: 'creatTime',
      render: (text: any, record: any) => {
        return (
          <span>{moment(parseInt(record.creatTime, 10)).format('YYYY-MM-DD H:mm:ss')}</span>
        )
      },
      sorter: (a: any, b: any) => parseInt(a.creatTime, 10) - parseInt(b.creatTime, 10),
      sortOrder: sortedInfo.order,
    }, {
      title: '最后修改时间',
      dataIndex: 'modifiedTime',
      key: 'modifiedTime',
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text: any, record: any) => {
        return (
          <Tag 
          style={{
            textAlign:"center",
            cursor:"pointer"
          }}
          color="#2db7f5" onClick={() => this.modalPetDetail(record.key, record.operation, record.serviceKind, record.status)}>审核</Tag>
        )
      }
    }];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const { tableData, modalPetDetailShow, productData, total } = this.state

    const { page } = this.props.match.params

    return (
      <div> 
        <Breadcrumb style={{ textAlign: "left", marginBottom: 25 }}>
          <Breadcrumb.Item>审核</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">宠物审核</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Table rowSelection={rowSelection} columns={columns} dataSource={tableData}
          pagination={{ pageSize: 10, "total": total, defaultCurrent: parseInt(page, 10) }}
          onChange={this.handleChange}
          locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }}
        />
        <ServiceAuditMsgModal
          serviceAuthId={serviceAuthId}
          audit={audit}
          productRecords={productRecords}
          data={productData}
          cancelModal={() => this.setState({
            modalPetDetailShow: false
          })}
          visible={modalPetDetailShow} />
      </div>
    )
  }
}
