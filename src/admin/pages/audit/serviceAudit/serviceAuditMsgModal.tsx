import * as React from 'react';
import { Modal, Tabs, Input, Table, Popover, Radio, message ,Button } from 'antd'
import './index.less'
import axios from '../../../util/Axios';
import moment from 'moment'

const TabPane = Tabs.TabPane;
const { TextArea } = Input;

const statusList = ["","待审核","审核通过","审核驳回","手动下架"]

interface Data {
    id: string,
    name: string,
    title: string,
    serviceKind: string,
    content:string
    price: number,
    contact: string,
    phone: string,
    streetArea: string,
    icon:string
}

interface ServiceAuditMsgModalProps {
    data: Data
    productRecords:any[]
    serviceAuthId: number,
    "audit": number,
    visible: boolean,
    cancelModal: () => void,
}

interface ServiceAuditMsgModalState {
    auditValue: number
    auditcontent:string,
    serviceAuthId: string
}
const PopImage = (imgSrc: string) => (
    <img src={imgSrc} alt="" style={{ width: 380 }} />
)

export class ServiceAuditMsgModal extends React.Component<ServiceAuditMsgModalProps, ServiceAuditMsgModalState> {
    constructor(props: ServiceAuditMsgModalProps) {
        super(props);
        this.state = {
            auditValue: this.props.audit,
            auditcontent:"",
            serviceAuthId: ""
        }
    }

    public componentDidMount() {
        console.log(this.props.audit)
    }

    public componentWillReceiveProps(nextProps: ServiceAuditMsgModalProps) {
        this.setState({
            auditValue: nextProps.audit
        })
    }

    public onChange = (e: any) => {
        this.setState({
            auditValue: e.target.value,
        })
    };

    public submit = () => {
        console.log(this.state.auditValue, this.props.serviceAuthId)
        axios({
            method: "post",
            url: `/audit/service`,
            data: {
                audit: this.state.auditValue,
                serviceAuthId: this.props.serviceAuthId,
                remark:this.state.auditcontent
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

        const { title, name, serviceKind, price, contact, phone, 
            streetArea, icon} = this.props.data

        const columns2 = [{
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
        
        const records = this.props.productRecords.map((item:any,index:number)=>{
            return {
                key:index,
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
                <Modal width={720} visible={this.props.visible} className="ServiceAuditMsgModal"
                    onCancel={this.props.cancelModal}
                    onOk={this.submit}
                    footer={[
                        <div key="audit" style={{textAlign:"left",margin:"10px 0"}}>
                            <Radio.Group value={this.state.auditValue} buttonStyle="solid" onChange={this.onChange.bind(this)}>
                                    <Radio.Button value={0}>待审核</Radio.Button>
                                    <Radio.Button value={1}>审核通过</Radio.Button>
                                    <Radio.Button value={2}>审核驳回</Radio.Button>
                                    <Radio.Button value={3}>手动下架</Radio.Button>
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
                >
                    <Tabs defaultActiveKey="1" size="large">
                        <TabPane tab="服务详情" key="1">
                            <div className="ServiceAuditMsgModalContent">
                                <p>
                                    <span>服务名称：</span>
                                    <span>{name}</span>
                                </p>
                                <p>
                                    <span>服务标题：</span>
                                    <span>{title}</span>
                                </p>
                                <p>
                                    <span>服务类别：</span>
                                    <span>{serviceKind}</span>
                                </p>
                                <p>
                                    <span>服务价格：</span>
                                    <span>{price}</span>
                                </p>

                                <p>
                                    <span>联系人：</span>
                                    <span>{`${contact}  ${phone}`}</span>
                                </p>
                                <p>
                                    <span>街道地址：</span>
                                    <span>{streetArea}</span>
                                </p>
                                <div>
                                    <span>服务照片</span>
                                    <div className="imgWrap">
                                    <div>
                                        <Popover content={PopImage(icon)} placement="right" trigger="hover"
                                            autoAdjustOverflow={false}
                                        >
                                            <img src={icon} alt="" />
                                        </Popover>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        {/* <TabPane tab="审核" key="4">
                            <div>
                                <Radio.Group value={this.state.auditValue} buttonStyle="solid" onChange={this.onChange.bind(this)}>
                                    <Radio.Button value={0}>待审核</Radio.Button>
                                    <Radio.Button value={1}>审核通过</Radio.Button>
                                    <Radio.Button value={2}>审核驳回</Radio.Button>
                                    <Radio.Button value={3}>手动下架</Radio.Button>
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
                        <TabPane tab="审核记录" key="5">
                        <Table 
                            columns={columns2}
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
