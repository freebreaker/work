import * as React from 'react';
import {
  Table, message, Breadcrumb ,Modal ,Typography ,Tag
} from 'antd';
import axios from '../../../util/Axios';
import { CompanyAuditMsgModal } from './companyAuditMsgModal';
import moment from 'moment'
import { AuditBox } from '../../../components/AuditBox';
import { apiGetCompanyAuditList } from '../../api';

const { Paragraph } = Typography;

// const auditStatus = ["待审核", "审核通过", "审核驳回"]

export default class CompanyAuditPage extends React.Component<any, any> {
  public state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    filteredInfo: null,
    sortedInfo: {
      order: "",
    },
    tableData: [],
    CompanyAuthId: 0,
    audit: 0,
    // auditcontent:"",
    CompanyData: {
      id: ``,
      companyName: ``,
      companyRegistMoney: ``,
      creditCode: ``,
      companyPhoto: ``,
      companyBisPhoto:``,
      companyBisTime:``,
      companyLegalName: ``,
      companyLegalContact: ``,
      companyFrontCardPhoto:``,
      companyBackCardPhoto: ``,
      companyHandCardPhoto: ``,
      companyAddress: ``,
      companyStatus:0,
      companyDiscription:"",
    },
    modalCompanyDetailShow: false,
    records:[],
    total:0
  };

  public getCompanyList = (page:number,size:number,status:string[])=>{
    const That = this
    apiGetCompanyAuditList(page,size,status).then((res: any) => {
      if (res && res.data.length > 0) {
        const tableData = res.data.map((item: any, index: number) => {
          return {
            key: item.id,  // key 应带对应data id 
            name: item.userId.nickname ? item.userId.nickname : "----",
            companyname: item.name ? item.name : "----",
            discription:item.discription?item.discription:"----",
            authtype:item.authType ? item.authType :"----",
            // area: item.nowAddress ? item.nowAddress : "----",
            authtime: item.authtime ? moment(parseInt(item.authtime, 10)).format('YYYY-MM-DD H:mm:ss') : "----",
            status: item.status,
            creatTime: item.ct ? item.ct : "----",
            modifiedTime: item.mt ? item.mt : "----",
            operation: `----`,
          }
        })
        That.setState({
          "tableData": tableData,
          resTableData: res.data,
          total:res && res.total
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
    const { page } = this.props.match.params
    this.getCompanyList(page, 10, ["0", "1", "2"])
  }

  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  public handleChange = (pagination: any, filters: any, sorter: any) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.props.history.push(`/home/companyAudit/${pagination.current}`)
    this.getCompanyList(pagination.current, pagination.pageSize, filters.status && filters.status.length > 0 ? filters.status : ["0", "1", "2"])
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  public modalCompanyDetail = (CompanyName: string, CompanyAuthId: string, audit: number) => {
    axios({
      method: "get",
      url: `/detail/company?id=${CompanyAuthId}`,
    }).then((res: any) => {
      if (res) {
        this.setState({
          modalCompanyDetailShow: true,
          "CompanyAuthId": res.id,
          audit: res.status,
          CompanyData: {
            id: res.id,
            companyName: res.name,
            companyRegistMoney: res.registMoney,
            creditCode: res.socialCode,
            companyPhoto: res.headPhoto,
            companyBisPhoto:res.bisPhoto,
            companyBisTime:res.bisDate,
            companyLegalName: res.legalName,
            companyLegalContact: res.legalTel,
            companyFrontCardPhoto:res.frontPhoto,
            companyBackCardPhoto:res.backPhoto,
            companyHandCardPhoto: res.handPhoto,
            companyAddress: res.nowAddress,
            companyStatus:res.status,
            companyDiscription:res.discription
          },
          records:res.records
        })
      } else {
        message.error("数据出错了")
      }
    })
  }

  public render() {

    const { selectedRowKeys, CompanyAuthId, audit , records}: any = this.state;

    let { filteredInfo, sortedInfo }: any = this.state;

    filteredInfo = filteredInfo || {};

    sortedInfo = sortedInfo || {};

    const columns = [{
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '企业',
      dataIndex: 'companyname',
      key: 'companyname',
      render: (text: any, record: any) => {
        return (
          <div onClick={()=>{
            Modal.success({
              title:record.companyname,
              content:record.discription,
              okText:"确定"
            })
          }} style={{cursor:"pointer"}}>
            <Paragraph ellipsis={true} style={{width:150}}>
              {
                record.companyname
              }
            </Paragraph>
          </div>

        )
      }
    },  {
      title: '企业类型',
      dataIndex: 'authtype',
      key: 'authtype',
    }
    // ,{
    //   title: '企业描述',
    //   dataIndex: 'discription',
    //   key: 'discription',
    //   render: (text: any, record: any) => {
    //     return (
    //       <div onClick={()=>{
    //         Modal.success({
    //           title:"认证内容",
    //           content:record.discription,
    //           okText:"确定"
    //         })
    //       }} style={{cursor:"pointer"}}>
    //         <Paragraph ellipsis={true} style={{width:150}}>
    //           {
    //             record.discription
    //           }
    //         </Paragraph>
    //       </div>

    //     )
    //   }
    // }
    ,{
      title: '认证时间',
      dataIndex: 'authtime',
      key: 'authtime',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '待审核', value: "0" },
        { text: '审核通过', value: "1" },
        { text: '审核驳回', value: "2" },
      ],
      render: (text: any, record: any) => {
        return (
          <AuditBox type={record.status}/>
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
          color="#2db7f5" onClick={() => this.modalCompanyDetail(record.name, record.key, record.status)}>审核</Tag>
        )
      }
    }];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const { tableData, modalCompanyDetailShow, CompanyData ,total} = this.state

    const { page } = this.props.match.params

    return (
      <div>
        <Breadcrumb style={{ textAlign: "left", marginBottom: 25 }}>
          <Breadcrumb.Item>审核</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">用户审核</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Table rowSelection={rowSelection} columns={columns} dataSource={tableData}
          pagination={{ pageSize: 10, "total": total, defaultCurrent: parseInt(page, 10) }}
          onChange={this.handleChange}
          locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }}
        />
        <CompanyAuditMsgModal
          CompanyAuthId={CompanyAuthId}
          records={records}
          audit={audit}
          data={CompanyData}
          cancelModal={() => this.setState({
            modalCompanyDetailShow: false
          })}
          visible={modalCompanyDetailShow} />
      </div>
    )
  }
}
