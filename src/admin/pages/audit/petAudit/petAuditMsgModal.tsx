import * as React from 'react';
import { Modal, Tabs, Input, Typography, Table, Popover, Radio, message, Button } from 'antd'
import './index.less'
import axios from '../../../util/Axios';
import moment from 'moment'

const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const { Title } = Typography;

const statusList = ["", "待审核", "审核通过", "审核驳回"]

interface Data {
    id: string,
    name: string,
    title: string,
    petKind: string,
    sex: number,
    birthday: string,
    price: string,
    publishArea: string,
    contact: string,
    phone: string,
    streetArea: string,
    imgMsgs: object[],
    vacMsgs: object[],
    repMsgs: object[],
}

interface PetAuditMsgModalProps {
    data: Data
    productRecords: any[]
    petAuthId: number,
    "audit": number,
    visible: boolean,
    cancelModal: () => void,
}

interface PetAuditMsgModalState {
    auditValue: number
    auditcontent: string,
    petAuthId: string
}
const PopImage = (imgSrc: string) => (
    <img src={imgSrc} alt="" style={{ width: 260 }} />
)

export class PetAuditMsgModal extends React.Component<PetAuditMsgModalProps, PetAuditMsgModalState> {
    constructor(props: PetAuditMsgModalProps) {
        super(props);
        this.state = {
            auditValue: this.props.audit,
            auditcontent: "",
            petAuthId: ""
        }
    }

    public componentDidMount() {
        console.log(this.props.audit)
    }

    public componentWillReceiveProps(nextProps: PetAuditMsgModalProps) {
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
        console.log(this.state.auditValue, this.props.petAuthId)
        axios({
            method: "post",
            url: `/audit/pet`,
            data: {
                audit: this.state.auditValue,
                petAuthId: this.props.petAuthId,
                remark: this.state.auditcontent
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

        const { title, name, petKind, sex, birthday, price, publishArea, contact, phone,
            streetArea, imgMsgs, vacMsgs, repMsgs } = this.props.data

        const imgsWraps = imgMsgs.map((item: any, index: number) => {
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
            title: '序号',
            dataIndex: 'order',
            key: 'order',
        }, {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        }, {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '图片',
            dataIndex: 'images',
            key: 'images',
        }, {
            title: '说明',
            dataIndex: 'introduction',
            key: 'introduction',
        }];

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

        const records = this.props.productRecords.map((item: any, index: number) => {
            return {
                key: index,
                auditname: item.cadminId.name,
                status: statusList[item.status],
                audittime: item.ct ? moment(parseInt(item.ct, 10)).format('YYYY-MM-DD H:mm:ss') : "----",
                remark: item.remark
            }
        })

        const vacTableData = vacMsgs.map((item: any, index: number) => {
            return {
                key: index,
                order: 2,
                time: 'time',
                address: "地址",
                images: "dd",
                introduction: "说明"
            }
        })

        const repTableData = repMsgs.map((item: any, index: number) => {
            return {
                key: index,
                order: 3,
                time: 'time',
                address: "地址",
                images: "dd",
                introduction: "说明"
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
            <Modal width={720} visible={this.props.visible} className="PetAuditMsgModal"
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
                    <TabPane tab="宠物详情" key="1">
                        <div className="PetAuditMsgModalContent">
                            <p>
                                <span>宠物名称：</span>
                                <span>{name}</span>
                            </p>
                            <p>
                                <span>宠物标题：</span>
                                <span>{title}</span>
                            </p>
                            <p>
                                <span>宠物类别：</span>
                                <span>{petKind}</span>
                            </p>
                            <p>
                                <span>宠物性别：</span>
                                <span>{sex ? "公" : "母"}</span>
                            </p>
                            <p>
                                <span>宠物生日：</span>
                                <span>{birthday}</span>
                            </p>
                            <p>
                                <span>宠物价格：</span>
                                <span>{price}</span>
                            </p>
                            <p>
                                <span>宠物发布区域：</span>
                                <span>{publishArea}</span>
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
                                <span>宠物照片</span>
                                <div className="imgWrap">
                                    {imgsWraps}
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="疫苗信息" key="2">
                        <Title level={4}>疫苗信息</Title>
                        <div className="PetAuditMsgModalContent">
                            <Table columns={columns}
                                dataSource={vacTableData}
                                pagination={{ pageSize: 5 }}
                                locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="驱虫信息" key="3">
                        <div className="PetAuditMsgModalContent">
                            <Table columns={columns}
                                dataSource={repTableData}
                                pagination={{ pageSize: 5 }}
                                locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }}
                            />
                        </div>
                    </TabPane>
                    {/* <TabPane tab="审核" key="4">
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
        );
    }
}
