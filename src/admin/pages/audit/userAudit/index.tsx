import * as React from 'react';
import {
  Table, message, Breadcrumb, Modal ,Tag
} from 'antd';
import axios from '../../../util/Axios';
import { UserAuditMsgModal } from './userAuditMsgModal';
import moment from 'moment'
import { AuditBox } from '../../../components/AuditBox';
import { apiGetUserAuditList } from '../../api';

// const auditStatus = ["待审核", "审核通过", "审核驳回"]

const UserTypeList = ["普通用户", "商户", "企业用户"]

const PopImage = (imgSrc: string) => (
  <img src={imgSrc} alt="" style={{ width: "100%" }} />
)

export default class UserAuditPage extends React.Component<any, any> {
  public state = {
    files: [],
    updateId: 1, // edit id 要更新的id
    selectedRowKeys: [], // Check here to configure the default column
    selectedPetKeys: [],
    selectedPetTypeKeys: [],
    loading: false,
    filteredInfo: null,
    sortedInfo: {
      order: "",
    },
    visible: false,
    authentVisible: false,
    cardVisible: false,
    value: 2,  // 默认选择的一级分类
    imageUrl: "",
    defaultProductName: "", // 编辑商品名字
    defalutSizeValue: 6, // 编辑商品体型
    editSizeVisible: false,  // 编辑商品体型选项是否显示
    tableData: [],
    resTableData: [],
    resPetTypeTableData: [],
    showImage: false,
    imageSrc: "",
    selectedPetOtherTypeKeys: [],
    radioValue: "",
    userId: 1,
    userData: {
      id: ``,
      name: `CompanyName`,
      realName: `res.realName`,
      cardNum: `res.cardNum`,
      sex: 0,
      nation: ``,
      birthday: ``,
      cardAddress: ``,
      cityCode: ``,
      cardFrom: ``, // 身份签发地
      frontPhoto: ``,
      endPhoto: ``,
      handPhoto: ``,
    },
    modalUserDetailShow: false,
    records: [],  // 审核记录
    total:0
  };

  public getUserList = (page:number,size:number,status:string[])=>{
    const That = this
    apiGetUserAuditList(page,size,status).then((res: any) => {
      if (res && res.data.length > 0) {
        const tableData = res.data.map((item: any, index: number) => {
          return {
            key: item.id,  // key 应带对应data id 
            userType: item.type ? UserTypeList[item.type] : UserTypeList[0],
            userName: item.realName,
            icon: item.userId.icon ? item.userId.icon : "----",
            status: item.status,
            authtime: item.authtime ? moment(parseInt(item.authtime, 10)).format('YYYY-MM-DD H:mm:ss') : "----",
            creatTime: item.ct ? item.ct : "----",
            operation: ""
          }
        })
        That.setState({
          "tableData": tableData,
          resTableData: res.goodList,
          total: res.total
        })
      }else{
        That.setState({
          "tableData": [],
          resTableData: res.goodList,
          total: res.total
        })
      }
    })
  }

  public componentDidMount() {
    const { page } = this.props.match.params
    this.getUserList(page,10,["0","1","2"])
  }

  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  public handleChange = (pagination: any, filters: any, sorter: any) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.props.history.push(`/home/userAudit/${pagination.current}`)
    this.getUserList(pagination.current, pagination.pageSize, filters.status && filters.status.length > 0 ? filters.status : ["0", "1", "2"])
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  public modalUserDetail = (CompanyName: string, UserAuthId: string, audit: number) => {
    axios({
      method: "get",
      url: `/detail/user?id=${UserAuthId}`,
    }).then((res: any) => {
      console.log(res)
      if (res) {
        this.setState({
          modalUserDetailShow: true,
          "UserAuthId": UserAuthId,
          "audit": audit,
          userData: {
            id: res.id,
            name: CompanyName,
            realName: res.realName,
            cardNum: res.cardNum,
            sex: res.sex,
            nation: res.nation,
            birthday: res.birthday,
            cardAddress: res.cardAddress,
            cityCode: res.citycode,
            cardFrom: res.signFrom, // 身份签发地
            frontPhoto: res.frontPhoto,
            endPhoto: res.backPhoto,
            handPhoto: res.handPhoto,
          },
          records: res.records
        })
      } else {
        message.error("数据出错了")
      }
    })
  }

  public render() {

    const { selectedRowKeys, UserAuthId, audit, records }: any = this.state;

    let { filteredInfo, sortedInfo }: any = this.state;

    filteredInfo = filteredInfo || {};

    sortedInfo = sortedInfo || {};

    const That =this

    const columns = [
      {
        title: '用户类型',
        dataIndex: 'userType',
        key: 'userType',
    },{
      title: '真实姓名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '头像',
      dataIndex: 'icon',
      key: 'icon',
      render: (text: any, record: any) => {

        if (record.icon !== "") {

          const imageUrlList = record.icon.split(',')

          const images = imageUrlList.map((item: string, index: number) => (
            <a href="javascript:void(0);" key={index} onClick={() => {
              That.setState({
                showImage: true,
                imageSrc: item
              })
            }}>点击查看</a>
          ))

          return images

        } else {

          return <span>暂无</span>

        }

      }
    }, {
      title: '认证时间',
      dataIndex: 'authtime',
      key: 'authtime',
    }, {
      title: '区域',
      dataIndex: 'area',
      key: 'area',
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
        console.log(record)
        return (
          <Tag 
          style={{
            textAlign:"center",
            cursor:"pointer"
          }}
          color="#2db7f5"  onClick={() => this.modalUserDetail(record.name, record.key, record.status)}>审核</Tag>
        )
      }
    }];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const { tableData, modalUserDetailShow, userData ,total} = this.state


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
        <UserAuditMsgModal
          UserAuthId={UserAuthId}
          audit={audit}
          records={records}
          data={userData}
          cancelModal={() => this.setState({
            modalUserDetailShow: false
          })}
          visible={modalUserDetailShow} />
        <Modal
          visible={this.state.showImage}
          onCancel={() => this.setState({ showImage: false })}
          footer={null}
        >
          {PopImage(this.state.imageSrc)}
        </Modal>
      </div>
    )
  }
}
