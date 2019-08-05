import * as React from 'react';
import {
  Table, message, Breadcrumb,Typography ,Modal,Tag
} from 'antd';
import axios from '../../../util/Axios';
import { ProductAuditMsgModal } from './productAuditMsgModal';
import moment from 'moment'
import { apiGetProductList } from '../../api';
import { AuditBox } from '../../../components/AuditBox';
const { Paragraph } = Typography;
// const auditStatus = ["待审核", "审核通过", "审核驳回"]

export default class ProductAuditPage extends React.Component<any, any> {
  public state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    filteredInfo: null,
    sortedInfo: {
      order: "",
    },
    tableData: [],
    productAuthId: 0,
    audit: 0,
    // auditcontent:"",
    productData: {
      order: "",
      "productKind": "",
      "productname": "",
      title: "",
      price: 0,
      time: "",
      address: "",
      images: [],
      introduction: "",
    },
    brandData: {
      name:"",
      logoImg:""
    },
    merchantData:{
      merchantName:"",
      merchantAddress:"",
      merchantTel:"",
      merchantIcon:"",
      merchantCity:``,
      merchantBeginTime:``,
      merchantEndTime:``,
    },
    stockData:{
      stockAttribute:"",
      stockPrice:``,
      stockNum:0,
      stockSalesVolume:0
    },
    modalProductDetailShow: false,
    records:[],
    total:0
  };

  public getProductList = (page:number,size:number,status:string[])=>{
    const That = this
    apiGetProductList(page,size,status).then((res: any) => {
      if (res.data&&res.data.length > 0) {
        const tableData = res.data.map((item: any, index: number) => {
          return {
            key: item.id,  // key 应带对应data id 
            name: item.userid.nickname ? item.userid.nickname : "----",
            publisher: item.userid.username ? item.userid.username : "----",
            productKind: item.productId.typeId.name ? item.productId.typeId.name : "----",
            price: item.productId.price ? item.productId.price : "----",
            title: item.title ? item.title : "----",
            productname: item.productId.name ? item.productId.name : "----",
            status: item.audit,
            // auditcontent:item.content, // 驳回理由
            creatTime: item.ct ? item.ct : "----",
            modifiedTime: item.mt ? moment(parseInt(item.mt,10)).format('YYYY-MM-DD H:mm:ss') : "----",
            productId: item.productId.id
          }
        })
        That.setState({
          "tableData": tableData,
          resTableData: res.data,
          total:res.total
        })
      }else{
        That.setState({
          "tableData": [],
          resTableData: res.data,
          total:0
        })
      }
    })
  }

  public componentDidMount() {
    this.getProductList(1,10,["0","1","2"])
  }

  public onSelectChange = (selectedRowKeys: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  public handleChange = (pagination: any, filters: any, sorter: any) => {
    this.props.history.push(`/home/productAudit/${pagination.current}`)
    this.getProductList(pagination.current,pagination.pageSize,filters.status ?filters.status:["0","1","2"])
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  public modalProductDetail = (productAuthId:string,productid: string, productKind: string,
    productname: string, productTitle: string, productPrice: number,audit:number ,auditcontent:string) => {
    axios({
      method: "get",
      url: `/detail/product?id=${productid}`,
    }).then((res: any) => {
      console.log(res)
      if (res) {
        this.setState({
          modalProductDetailShow: true,
          "productAuthId": productAuthId,
          "audit": audit,
          "auditcontent":auditcontent,
          productData: {
            order: "string",
            "productKind": productKind,
            "productname": productname,
            price: productPrice,
            title: productTitle,
            time: "string",
            address: "string",
            images: res.imgMsgs ? res.imgMsgs : [],
            introduction: res.content ? res.content : "----",
          },
          brandData: {
            name: res.brandId.name,
            logoImg: res.brandId.logoImg
          },
          merchantData:{
            merchantName:res.merchantId.name,
            merchantAddress:res.merchantId.address,
            merchantTel:res.merchantId.tel,
            merchantIcon:res.merchantId.icon,
            merchantCity:res.merchantId.city,
            merchantBeginTime:res.merchantId.beginTime,
            merchantEndTime:res.merchantId.endTime,
          },
          stockData:{
            stockAttribute:res.stockId.attribute,
            stockPrice:res.stockId.price,
            stockNum:res.stockId.num,
            stockSalesVolume:res.stockId.salesVolume,
          },
          records:res.records
        })
      } else {
        message.error("数据出错了")
      }
    })
  }

  public render() {

    const { selectedRowKeys }: any = this.state;

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
      title: '商品类别',
      dataIndex: 'productKind',
      key: 'productKind',
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '商品标题',
      dataIndex: 'title',
      key: 'title',
      render: (text: any, record: any) => {
        return (
          <div onClick={()=>{
            Modal.success({
              title:"商品标题",
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
      title: '商品名称',
      dataIndex: 'productname',
      key: 'productname',
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
          color="#2db7f5" onClick={() =>
            this.modalProductDetail(
              record.key,
              record.productId,
              record.productKind,
              record.productname,
              record.title,
              record.price,
              record.status,
              record.auditcontent)}>审核</Tag>
        )
      }
    }];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const { tableData, modalProductDetailShow, productData, 
      brandData ,merchantData ,stockData ,productAuthId ,audit ,
      records,total}  = this.state

    const {page} = this.props.match.params

    return (
      <div>
        <Breadcrumb style={{ textAlign: "left", marginBottom: 25 }}>
          <Breadcrumb.Item>审核</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">商品审核</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Table rowSelection={rowSelection} columns={columns} dataSource={tableData}
          pagination={{ pageSize: 10 ,"total":total,defaultCurrent:parseInt(page,10)}}
          onChange={this.handleChange}
          locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }}
        />
        <ProductAuditMsgModal 
          productAuthId={productAuthId}
          audit={audit}
          // auditcontent={auditcontent}
          records={records}
          data={productData}
          brandData={brandData}
          merchantData={merchantData}
          stockData={stockData}
          cancelModal={() => this.setState({
            modalProductDetailShow: false
          })}
          visible={modalProductDetailShow} />
      </div>
    )
  }
}
