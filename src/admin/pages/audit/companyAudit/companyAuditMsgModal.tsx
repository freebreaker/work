import * as React from 'react';
import { Modal, Tabs, Radio, message, Popover, Input, Table, Button } from 'antd'
import './index.less'
import axios from '../../../util/Axios';
import moment from 'moment'

const TabPane = Tabs.TabPane;
const { TextArea } = Input;

const statusList = ["", "待审核", "审核通过", "审核驳回"]

interface Data {
    id: string
    companyName: string
    companyRegistMoney: string
    creditCode: string
    companyPhoto: string
    companyBisPhoto: string 
    companyBisTime: string
    companyLegalName: string
    companyLegalContact: string
    companyFrontCardPhoto: string
    companyBackCardPhoto: string
    companyHandCardPhoto: string
    companyAddress: string
    companyStatus: number
    companyDiscription: string
}

interface CompanyAuditMsgModalProps {
    data: Data
    records: any[]
    CompanyAuthId: number
    "audit": number
    visible: boolean
    cancelModal: () => void
}

interface CompanyAuditMsgModalState {
    auditValue: number
    remark: string
    CompanyAuthId: string
}
const PopImage = (imgSrc: string) => (
    <img src={imgSrc} alt="" style={{ width: 260 }} />
)

export class CompanyAuditMsgModal extends React.Component<CompanyAuditMsgModalProps, CompanyAuditMsgModalState> {
    constructor(props: CompanyAuditMsgModalProps) {
        super(props);
        this.state = {
            auditValue: props.audit,
            remark: "", // 备注
            CompanyAuthId: ""
        }
    }

    public componentDidMount() {
        console.log(this.props)
    }

    public componentWillReceiveProps(nextProps: CompanyAuditMsgModalProps) {
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
            url: `/audit/company`,
            data: {
                audit: this.state.auditValue,
                CompanyAuthId: this.props.CompanyAuthId,
                remark: this.state.remark
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

        const {
            companyName,
            companyRegistMoney,
            creditCode,
            companyPhoto,
            companyBisPhoto,
            companyLegalName,
            companyLegalContact,
            companyFrontCardPhoto,
            companyBackCardPhoto,
            companyHandCardPhoto,
            companyAddress,
            companyDiscription
        } = this.props.data

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

        const records = this.props.records.map((item: any,index:number) => {
            return {
                key: index,
                auditname: item.cadminId.name,
                status: statusList[item.status],
                audittime: item.ct ? moment(parseInt(item.ct, 10)).format('YYYY-MM-DD H:mm:ss') : "----",
                remark: item.remark
            }
        })

        const TextBox =
            this.state.auditValue === 2 ?
                <TextArea
                    key="reason"
                    style={{
                        margin: "10px 0 20px 0"
                    }}
                    placeholder="驳回理由"
                    rows={3} value={this.state.remark} onChange={(e: any) => {
                        this.setState({
                            remark: e.target.value
                        })
                    }} />
                : ""
        console.log(TextBox)
        return (
            <div>
                <Modal width={820} visible={this.props.visible} className="CompanyAuditMsgModal"
                    onCancel={this.props.cancelModal}
                    onOk={this.submit}
                    footer={[
                        <div key="audit" style={{ textAlign: "left", margin: "10px 0" }}>
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
                        <TabPane tab="企业详情" key="1">
                            <div className="CompanyAuditMsgModalContent">
                                <p>
                                    <span>企业名称：</span>
                                    <span>{companyName}</span>
                                </p>
                                <p>
                                    <span>注册资金：</span>
                                    <span>{companyRegistMoney}</span>
                                </p>
                                <p>
                                    <span>企业社会信用代码：</span>
                                    <span>{creditCode}</span>
                                </p>
                                <p>
                                    <span>法人姓名：</span>
                                    <span>{companyLegalName}</span>
                                </p>
                                <p>
                                    <span>联系方式：</span>
                                    <span>{companyLegalContact}</span>
                                </p>
                                <p>
                                    <span>企业地址：</span>
                                    <span>{companyAddress}</span>
                                </p>
                                <p style={{width:"100%",display:"flex"}}>
                                    <span style={{width:"auto"}}>企业描述：</span>
                                    <span style={{width:"80%"}}>{companyDiscription}{companyDiscription}</span>
                                </p>
                                <div>
                                    <span>企业门头照</span>
                                    <div className="imgWrap">
                                        <div>
                                            <Popover content={PopImage(companyPhoto)} placement="top" trigger="hover"
                                                autoAdjustOverflow={false}
                                                title="门头照"
                                            >
                                                <img src={companyPhoto} alt="" />
                                            </Popover>
                                        </div>
                                        <div>
                                            <Popover content={PopImage(companyBisPhoto)} placement="top" trigger="hover"
                                                autoAdjustOverflow={false}
                                                title="营业执照"
                                            >
                                                <img src={companyBisPhoto} alt="" />
                                            </Popover>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span>身份证照</span>
                                    <div className="imgWrap">
                                        <div>
                                            <Popover content={PopImage(companyFrontCardPhoto)} placement="top" trigger="hover"
                                                autoAdjustOverflow={false}
                                                title="正面照"
                                            >
                                                <img src={companyFrontCardPhoto} alt="" />
                                            </Popover>
                                        </div>
                                        <div>
                                            <Popover content={PopImage(companyBackCardPhoto)} placement="top" trigger="hover"
                                                autoAdjustOverflow={false}
                                                title="反面照"
                                            >
                                                <img src={companyBackCardPhoto} alt="" />
                                            </Popover>
                                        </div>
                                        <div>
                                            <Popover content={PopImage(companyHandCardPhoto)} placement="top" trigger="hover"
                                                autoAdjustOverflow={false}
                                                title="手持照"
                                            >
                                                <img src={companyHandCardPhoto} alt="" />
                                            </Popover>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </TabPane>
                        {/* <TabPane tab="审核" key="2">
                            <div>
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
                                        rows={3} value={this.state.remark} onChange={(e: any) => {
                                            this.setState({
                                                remark: e.target.value
                                            })
                                        }} />
                                    : ""
                            }
                        </TabPane> */}
                        <TabPane tab="审核记录" key="3">
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
