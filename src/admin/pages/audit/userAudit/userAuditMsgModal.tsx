import * as React from 'react';
import { Modal, Tabs, Input, Radio, message, Popover, Table ,Button} from 'antd'
import './index.less'
import axios from '../../../util/Axios';
import moment from 'moment'

const TabPane = Tabs.TabPane;

const statusList = ["待审核", "审核通过", "审核驳回"]

const { TextArea } = Input;

interface Data {
    id: string,
    name: string,
    realName: string,
    cardNum: string,
    sex: number,
    nation: string,
    birthday: string,
    cardAddress: string,
    cityCode: string,
    cardFrom: string, // 身份签发地
    frontPhoto: string,
    endPhoto: string,
    handPhoto: string,
}

interface UserAuditMsgModalProps {
    data: Data
    records: any[]
    UserAuthId: number,
    "audit": number,
    visible: boolean,
    cancelModal: () => void,
}

interface UserAuditMsgModalState {
    auditValue: number
    remark: string
    UserAuthId: string
}

const PopImage = (imgSrc: string) => (
    <img src={imgSrc} alt="" style={{ width: 260 }} />
)

export class UserAuditMsgModal extends React.Component<UserAuditMsgModalProps, UserAuditMsgModalState> {
    constructor(props: UserAuditMsgModalProps) {
        super(props);
        this.state = {
            auditValue: this.props.audit,
            remark: "",
            UserAuthId: ""
        }
    }

    public componentWillReceiveProps(nextProps: UserAuditMsgModalProps) {
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
        axios({
            method: "post",
            url: `/audit/user`,
            data: {
                audit: this.state.auditValue,
                UserAuthId: this.props.UserAuthId,
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

        const { realName, cardNum,
            frontPhoto, endPhoto,
            handPhoto, sex, nation, birthday, cardAddress, cityCode, cardFrom } = this.props.data

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

        const records = this.props.records.map((item: any) => {
            return {
                auditname: item.cadminId.name,
                status: statusList[item.status],
                audittime: item.ct ? moment(parseInt(item.ct, 10)).format('YYYY-MM-DD H:mm:ss') : "----",
                remark: item.remark
            }
        })

        const TextBox =
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


        return (
            <div>
                <Modal width={600} visible={this.props.visible} className="UserAuditMsgModal"
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
                        <TabPane tab="用户详情" key="1">
                            <div className="UserAuditMsgModalContent">
                                <p>
                                    <span>真实姓名：</span>
                                    <span>{realName}</span>
                                </p>
                                <p>
                                    <span>身份证号：</span>
                                    <span>{cardNum}</span>
                                </p>
                                <p>
                                    <span>性别：</span>
                                    <span>{sex === 0 ? "女" : "男"}</span>
                                </p>
                                <p>
                                    <span>民族：</span>
                                    <span>{nation}</span>
                                </p>
                                <p>
                                    <span>生日：</span>
                                    <span>{birthday}</span>
                                </p>
                                <p>
                                    <span>身份证地址：</span>
                                    <span>{cardAddress}</span>
                                </p>
                                <p>
                                    <span>区域</span>
                                    <span>{cityCode}</span>
                                </p>
                                <p>
                                    <span>身份证签发地：</span>
                                    <span>{cardFrom}</span>
                                </p>
                                <div>
                                    <span>身份证照片</span>
                                    <div className="imgWrap">
                                        <div>
                                            <Popover content={PopImage(frontPhoto)} placement="top" trigger="hover"
                                                autoAdjustOverflow={false}
                                            >
                                                <img src={frontPhoto} alt="" />
                                            </Popover>
                                        </div>
                                        <div>
                                            <Popover content={PopImage(endPhoto)} placement="top" trigger="hover"
                                                autoAdjustOverflow={false}
                                            >
                                                <img src={endPhoto} alt="" />
                                            </Popover>
                                        </div>
                                        <div>
                                            <Popover content={PopImage(handPhoto)} placement="top" trigger="hover"
                                                autoAdjustOverflow={false}
                                            >
                                                <img src={handPhoto} alt="" />
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
