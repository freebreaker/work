import * as React from 'react';
import { Modal, Tabs, Popover, Radio, message, Input ,Table ,Button} from 'antd'
import './index.less'
import axios from '../../../util/Axios';
import moment from 'moment'

const TabPane = Tabs.TabPane;
const { TextArea } = Input;

const statusList = ["","待审核","审核通过","审核驳回"]

interface Data {
    order: string,
    productKind: string,
    productname: string,
    title: string,
    price: number,
    time: string,
    address: string,
    images: string[],
    introduction: string,
}

interface BrandData {
    name: string
    logoImg: string
}

interface MerchantData {
    merchantName: string
    merchantAddress: string
    merchantTel: string
    merchantIcon: string
    merchantCity: string
    merchantBeginTime: string
    merchantEndTime: string
}

interface StockData {
    stockAttribute: string
    stockPrice: string
    stockNum: number
    stockSalesVolume: number
}

interface ProductAuditMsgModalProps {
    data: Data
    audit: number,
    // auditcontent: string,
    records:any[],
    productAuthId: number,
    brandData: BrandData
    merchantData: MerchantData
    stockData: StockData
    visible: boolean,
    cancelModal: () => void
}

const PopImage = (imgSrc: string) => (
    <img src={imgSrc} alt="" style={{ width: 260 }} />
)

export class ProductAuditMsgModal extends React.Component<ProductAuditMsgModalProps, any> {
    public state = {
        auditValue: this.props.audit,
        auditcontent: "",
        productAuthId: ""
    }
    public componentWillReceiveProps(nextProps: ProductAuditMsgModalProps) {
        this.setState({
            auditValue: nextProps.audit,
        })
    }

    public onChange = (e: any) => {
        this.setState({
            auditValue: e.target.value,
        })
    };

    public submit = () => {
        axios({
            method: "post",
            url: `/audit/product`,
            data: {
                audit: this.state.auditValue,
                remark:this.state.auditcontent,
                productAuthId: this.props.productAuthId
            }
        }).then((res: any) => {
            if (res) {
                message.success("审核成功")
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            } else {
                message.error("审核失败")
            }
        })
    }

    public render() {
        const { images, productKind, productname, title, price, introduction } = this.props.data

        const { name, logoImg } = this.props.brandData

        const { merchantName, merchantAddress
            , merchantBeginTime, merchantEndTime
            , merchantCity, merchantTel, merchantIcon } = this.props.merchantData

        const { stockAttribute, stockPrice, stockNum, stockSalesVolume } = this.props.stockData
        const imgsWraps = images.map((item: any, index: number) => {
            return (
                <div key={index}>
                    <Popover content={PopImage(item.addr)} placement="top" trigger="hover"
                        autoAdjustOverflow={false}
                    >
                        <img src={item.addr} alt="" />
                    </Popover>
                </div>
            )
        })

        const columns = [{
            title: '审核人员',
            dataIndex: 'auditname',
            key: 'auditname',
        }, {
            title: '审核状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '审核时间',
            dataIndex: 'audittime',
            key: 'audittime',
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        }];

        const records = this.props.records.map((item:any)=>{
            return {
                auditname:item.cadminId.name,
                status:statusList[item.status],
                audittime:item.ct ? moment(parseInt(item.ct,10)).format('YYYY-MM-DD H:mm:ss') : "----",
                remark:item.remark
            }
        })

        const TextBox =

        this.state.auditValue === 2 ?
            <TextArea
                style={{
                    marginBottom: 10
                }}
                placeholder="驳回理由"
                rows={3} value={this.state.auditcontent} onChange={(e: any) => {
                    this.setState({
                        auditcontent: e.target.value
                    })
                }} />
            : ""
        
        return (
            <div>
                <Modal width={800} visible={this.props.visible} className="ProductAuditMsgModal"
                    onCancel={this.props.cancelModal}
                    onOk={this.submit}
                    footer={[
                        <div key="audit" style={{textAlign:"left",margin:"10px 0"}}>
                            <Radio.Group value={this.state.auditValue} buttonStyle="solid" onChange={this.onChange.bind(this)}>
                                <Radio.Button value={0}>待审核</Radio.Button>
                                <Radio.Button value={1}>审核通过</Radio.Button>
                                <Radio.Button value={2}>审核驳回</Radio.Button>
                            </Radio.Group>
                        </div>,
                        TextBox,
                        <Button key="back" onClick={this.props.cancelModal}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.submit}>
                            确定
                        </Button>,
                    ]}
                >
                    <Tabs defaultActiveKey="1" size="large">
                        <TabPane tab="商品详情" key="1">
                            <div className="ProductAuditMsgModalContent">
                                <p>
                                    <span>商品名称：</span>
                                    <span>{productname}</span>
                                </p>
                                <p>
                                    <span>商品标题：</span>
                                    <span>{title}</span>
                                </p>
                                <p>
                                    <span>商品类别：</span>
                                    <span>{productKind}</span>
                                </p>
                                <p>
                                    <span>商品价格：</span>
                                    <span>{price}</span>
                                </p>
                                <p>
                                    <span>商品重量：</span>
                                    <span>100</span>
                                </p>
                                <p>
                                    <span>商品描述：</span>
                                    <span>{introduction}</span>
                                </p>
                                <p>
                                    <span>发布区域：</span>
                                    <span>100</span>
                                </p>
                                <p>
                                    <span>联系人：</span>
                                    <span>100</span>
                                </p>
                                <div>
                                    <span>商品头部照片</span>
                                    <div className="imgWrap">
                                        {imgsWraps}
                                    </div>
                                    <span>商品照片</span>
                                    <div className="imgWrap">
                                        {imgsWraps}
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="商品品牌" key="2">
                            <div className="ProductAuditMsgModalContent">
                                <p>
                                    <span>品牌名：</span>
                                    <span>{name}</span>
                                </p>
                                <div style={{ width: "100%" }}>
                                    <span>品牌logo:</span>
                                    <div className="">
                                        <Popover content={PopImage(logoImg)} placement="right" trigger="hover"
                                            autoAdjustOverflow={false}
                                        >
                                            <img src={logoImg} alt="" style={{ width: 80, marginTop: 20 }} />
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="店铺信息" key="3">
                            <div className="ProductAuditMsgModalContent">
                                <p>
                                    <span>店铺名：</span>
                                    <span>{merchantName}</span>
                                </p>
                                <p>
                                    <span>店铺地址：</span>
                                    <span>{merchantCity}  {merchantAddress}</span>
                                </p>
                                <p>
                                    <span>店铺电话：</span>
                                    <span>{merchantTel}</span>
                                </p>
                                <p>
                                    <span>店铺icon：</span>
                                    <span>{merchantIcon}</span>
                                </p>
                                <p>
                                    <span>营业时间：</span>
                                    <span>{merchantBeginTime}至{merchantEndTime}</span>
                                </p>
                                <div style={{ width: "100%" }}>
                                    <span>品牌logo:</span>
                                    <div className="">
                                        <Popover content={PopImage(logoImg)} placement="right" trigger="hover"
                                            autoAdjustOverflow={false}
                                        >
                                            <img src={logoImg} alt="" style={{ width: 80, marginTop: 20 }} />
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="库存信息" key="4">
                            <div className="ProductAuditMsgModalContent">
                                <p>
                                    <span>库存属性：</span>
                                    <span>{stockAttribute}</span>
                                </p>
                                <p>
                                    <span>库存量：</span>
                                    <span>{stockNum}</span>
                                </p>
                                <p>
                                    <span>库存销量：</span>
                                    <span>{stockSalesVolume}</span>
                                </p>
                                <p>
                                    <span>价格：</span>
                                    <span>{stockPrice}</span>
                                </p>
                            </div>
                        </TabPane>
                        {/* <TabPane tab="审核" key="5">
                            <div className="ProductAuditMsgModalContent">
                                <Radio.Group value={this.state.auditValue} buttonStyle="solid" onChange={this.onChange.bind(this)}>
                                    <Radio.Button value={0}>待审核</Radio.Button>
                                    <Radio.Button value={1}>审核通过</Radio.Button>
                                    <Radio.Button value={2}>审核驳回</Radio.Button>
                                </Radio.Group>
                            </div>

                            {
                                this.state.auditValue === 2 ?
                                    <TextArea
                                        style={{
                                            marginTop: 10
                                        }}
                                        placeholder="驳回理由"
                                        rows={3} value={this.state.auditcontent} onChange={(e: any) => {
                                            this.setState({
                                                auditcontent: e.target.value
                                            })
                                        }} />
                                    : ""
                            }
                        </TabPane> */}
                        <TabPane tab="审核记录" key="6">
                        <Table 
                            columns={columns}
                            dataSource={records}
                            pagination={{ pageSize: 5 }}
                            locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }}
                        />
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}
