import * as React from 'react';
import {
  Table, message, Breadcrumb ,Typography ,Modal
} from 'antd';
import axios from '../../../util/Axios';
import { PetAuditMsgModal } from './petAuditMsgModal';
import moment from 'moment'
import { apiGetPetAuditList } from '../../api';
import { Tag } from "antd";
import { AuditBox } from '../../../components/AuditBox';
const { Paragraph } = Typography;

// const auditStatus = ["待审核", "审核通过", "审核驳回"]

export default class PetAuditPage extends React.Component<any, any> {
  public state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    filteredInfo: null,
    sortedInfo: {
      order: "",
    },
    tableData: [],
    petAuthId: 0,
    audit: 0,
    productData: {
      id: "",
      name: "",
      title: "title",
      petKind: "",
      sex: 0,
      color: "",
      birthday: "",
      price: "",
      imgUrlPapers: "",
      content: "",
      contact: "",
      phone: "",
      publishArea: "",
      streetArea: "",
      imgMsgs: [],
      vacMsgs: [],
      repMsgs: [],
    },
    productRecords: [],
    modalPetDetailShow: false,
    total: 0
  };



  public getAuditList = (page: number, size: number, status: string[]) => {
    const That = this
    apiGetPetAuditList(page, size, status).then((res: any) => {
      if (res.data && res.data.length > 0) {
        const tableData = res.data.map((item: any, index: number) => {
          return {
            key: item.id,  // key 应带对应data id 
            name: item.userId ? item.userId.nickname : "----",
            publisher: item.userId ? item.userId.username : "----",
            petKind: item.typeId ? item.typeId.name : "----",
            price: item.price ? item.price : "----",
            title: item.title ? item.title : "----",
            content: item.content ? item.content : "----",
            status: item.status,
            creatTime: item.ct ? item.ct : "----",
            modifiedTime: item.mt ? item.mt : "----",
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
          total:res && res.total
        })
      }
    })
  }

  public componentDidMount() {
    // console.log(this.props.match.params)
    const { page } = this.props.match.params
    this.getAuditList(page, 10, ["0", "1", "2"])
  }

  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  public handleChange = (pagination: any, filters: any, sorter: any) => {
    this.props.history.push(`/home/petAudit/${pagination.current}`)
    console.log(filters.status)
    this.getAuditList(pagination.current, pagination.pageSize, filters.status && filters.status.length > 0 ? filters.status : ["0", "1", "2"])
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  public modalPetDetail = (petAuthId: number, petid: string, petKind: string, audit: number) => {
    axios({
      method: "get",
      url: `/detail/pet?id=${petid}`,
    }).then((res: any) => {
      if (res) {
        this.setState({
          modalPetDetailShow: true,
          "petAuthId": petAuthId,
          "audit": audit,
          productData: {
            id: res.id,
            name: res.name,
            title: res.title,
            "petKind": petKind,
            sex: res.sex ? res.sex : 0,
            color: res.color ? res.color : "未知",
            birthday: res.brithday ? res.brithday : "未知",
            price: res.price ? res.price : "面议",
            imgUrlPapers: "",
            content: res.content ? res.content : "内容详情",
            contact: res.userId ? res.userId.username : "----",
            phone: res.userId ? res.userId.phone : "----",
            publishArea: res.citycode ? res.citycode : "暂无",
            streetArea: res.addressId ? res.addressId : "暂无",
            imgMsgs: res.imgMsgs ? res.imgMsgs : [],
            vacMsgs: res.vacMsgs ? res.vacMsgs : [],
            repMsgs: res.repMsgs ? res.repMsgs : [],
          },
          productRecords: res.records
        })
      } else {
        message.error("数据出错了")
      }
    })
  }

  public render() {

    const { selectedRowKeys, petAuthId, audit, productRecords }: any = this.state;

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
      dataIndex: 'petKind',
      key: 'petKind',
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '认证标题',
      dataIndex: 'title',
      key: 'title',
      render: (text: any, record: any) => {
        return (
          <div onClick={()=>{
            Modal.success({
              title:"认证标题",
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
      title: '认证内容',
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
            <Paragraph ellipsis={true} style={{width:100}}>
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
      render: (text: any, record: any) => {
        return (
          <span>{moment(parseInt(record.modifiedTime, 10)).format('YYYY-MM-DD H:mm:ss')}</span>
        )
      },
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
          color="#2db7f5"
          onClick={() => this.modalPetDetail(record.key, record.operation, record.petKind, record.status)}
          >审核</Tag>
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
        <PetAuditMsgModal
          petAuthId={petAuthId}
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
