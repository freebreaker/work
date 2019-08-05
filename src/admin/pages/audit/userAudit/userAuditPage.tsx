import * as React from 'react';
import {
    Table, Button, message, Breadcrumb, Modal, Radio, Popover
} from 'antd';
import './index.less';
import moment from 'moment'
import axios from '../../../util/Axios';

const UserTypeList = ["普通用户", "商户", "企业用户"]

const StatusList = ["待审核", "审核通过", "审核失败"]

const PopImage = (imgSrc: string) => (
    <img src={imgSrc} alt="" style={{ width: "100%" }} />
)

export class UserAuthentList extends React.Component<any, any> {

    public state = {
        files: [],
        updateId: 1, // edit id 要更新的id
        selectedRowKeys: [], // Check here to configure the default column
        selectedPetKeys: [],
        selectedPetTypeKeys: [],
        loading: false,
        filteredInfo: null,
        sortedInfo: "",
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
        cardMsg: {
            frontPhoto: "",
            backPhoto: "",
            handPhoto: "",
            realName: "",
            cardNum: "",
            sex: "",
            nation: "",
            birthday: "",
            cardAddress: "",
            cityCode: "",
            signFrom: "",
            beginTime: "",
            endTime: "",
        }
    };

    public componentDidMount() {
        const That = this
        axios({
            method: "get",
            url: "/user/authentlist"
        }).then((res: any) => {
            if (res.data.length > 0) {
                const tableData = res.data.map((item: any, index: number) => {
                    return {
                        key: item.id,  // key 应带对应data id 
                        userType: item.type ? UserTypeList[item.type] : UserTypeList[0],
                        userName: item.realName,
                        icon: item.icon ? item.icon : "----",
                        status: item.status ? StatusList[item.status] : StatusList[0],
                        card: {
                            frontPhoto: item.frontPhoto,
                            backPhoto: item.backPhoto,
                            handPhoto: item.handPhoto,
                            realName: item.realName,
                            cardNum: item.cardNum,
                            sex: item.sex,
                            nation: item.nation,
                            birthday: item.birthday,
                            cardAddress: item.cardAddress,
                            cityCode: item.cityCode,
                            signFrom: item.signFrom,
                            beginTime: item.beginTime,
                            endTime: item.endTime,
                        },
                        authtime: item.authtime ? moment(parseInt(item.authtime, 10)).format('YYYY-MM-DD H:mm:ss') : "----",
                        ct: item.ct ? moment(parseInt(item.ct, 10)).format('YYYY-MM-DD H:mm:ss') : "----",
                        operation: ""
                    }
                })
                That.setState({
                    "tableData": tableData,
                    resTableData: res.data.goodList,
                })
            }
        })
    }

    public onSelectChange = (selectedRowKeys: any) => {
        this.setState({ selectedRowKeys });
    }

    public handleChange = (pagination: any, filters: any, sorter: any) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    public handleDelete = (key: any) => {
        console.log(key)
    }

    public addGoodType = () => {
        this.showDrawer()
    }

    public editAuthentCard = (cardMsg: any) => {
        console.log(cardMsg)
        this.setState({
            cardVisible: true,
            "cardMsg": cardMsg
        })
    }

    public editAuthentStatus = (record: any) => {
        console.log(record.size === "----", record)
        this.setState({
            authentVisible: true,
            updateId: record.key,
        })
    }

    public showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    public deleteGoodType = () => {

        const selectedRowKeys = this.state.selectedRowKeys

        axios({
            method: "post",
            url: "/good/delete",
            data: {
                ids: selectedRowKeys
            }
        }).then((res: any) => {
            if (res.data) {
                message.success("删除成功")
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            } else {
                message.error("删除失败")
            }
        })

    }
    public handleOk = () => {
        const { radioValue, updateId } = this.state
        axios({
            method: "post",
            url: `/user/status`,
            data: {
                status: radioValue,
                "userId": updateId
            }
        }).then((res) => {
            if (res.data) {
                message.success("修改成功")
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            } else {
                message.error("修改失败")
            }
        })
    }

    public handleCancel = () => {
        this.setState({
            authentVisible: false
        })
    }

    public handleCardOk = () => {
        this.setState({
            cardVisible: false
        })
    }

    public handleCardCancel = () => {
        this.setState({
            cardVisible: false
        })
    }

    public radioChange = (e: any) => {
        console.log(e.target.value)
        this.setState({
            radioValue: e.target.value
        })
    }
    public render() {

        const { selectedRowKeys, tableData, cardMsg } = this.state;

        const That = this

        let { filteredInfo }: any = this.state;

        filteredInfo = filteredInfo || {};

        const columns = [{
            title: '用户类型',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '审核情况',
            dataIndex: 'status',
            key: 'status',
        },{
            title: '真实姓名',
            dataIndex: 'userName',
            key: 'userName',
        }, {
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
            title: '创建时间',
            dataIndex: 'ct',
            key: 'ct',
        }, {
            title: '身份证信息',
            dataIndex: 'card',
            key: 'card',
            render: (text: any, record: any) => {
                return (
                    <a href="javascript:;" onClick={this.editAuthentCard.bind(this, record.card)}>身份证信息</a>
                )
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text: any, record: any) => {
                return (
                    <a href="javascript:;" onClick={this.editAuthentStatus.bind(this, record)}>审核</a>
                )
            }
        }];

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        const hasSelected = selectedRowKeys.length > 0

        return (
            <div>
                <Breadcrumb style={{ textAlign: "left", marginBottom: 25 }}>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">审核报表</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ marginBottom: 16, textAlign: "left" }}>
                    <Button type="primary" onClick={this.addGoodType.bind(this)} style={{ marginRight: 20 }}>
                        添加
                    </Button>
                    <Button type="danger" disabled={!hasSelected} onClick={() => {
                        this.deleteGoodType()
                    }}>
                        删除
                    </Button>

                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `选择了${selectedRowKeys.length}项` : ''}
                    </span>
                </div>
                <div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={tableData}
                        pagination={{ pageSize: 10 }}
                        onChange={this.handleChange}
                        locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }}
                    />
                </div>
                <Modal
                    visible={this.state.showImage}
                    onCancel={() => this.setState({ showImage: false })}
                    footer={null}
                >
                    {PopImage(this.state.imageSrc)}
                </Modal>
                <Modal
                    title="选择角色"
                    visible={this.state.authentVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <div>
                        <Radio.Group defaultValue="a" buttonStyle="solid"
                            onChange={this.radioChange.bind(this)}
                        >
                            <Radio.Button value={0}>待审核</Radio.Button>
                            <Radio.Button value={1}>审核通过</Radio.Button>
                            <Radio.Button value={2}>审核失败</Radio.Button>
                        </Radio.Group>
                    </div>
                </Modal>
                <Modal
                    title="身份证信息"
                    width={600}
                    visible={this.state.cardVisible}
                    onOk={this.handleCardOk}
                    onCancel={this.handleCardCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <div className="cardMsgs">
                        <div className="msgs">
                            <p>
                                <span>身份证号：</span>
                                <span>{cardMsg.cardNum}</span>
                            </p>
                            <p>
                                <span>真实姓名：</span>
                                <span>{cardMsg.realName}</span>
                            </p>
                            <p>
                                <span>性别：</span>
                                <span>{cardMsg.sex}</span>
                            </p>
                            <p>
                                <span>民族：</span>
                                <span>{cardMsg.nation}</span>
                            </p>
                            <p>
                                <span>生日：</span>
                                <span>{cardMsg.birthday}</span>
                            </p>
                            <p>
                                <span>身份证地址：</span>
                                <span>{cardMsg.cardAddress}</span>
                            </p>
                            <p>
                                <span>区域</span>
                                <span>{cardMsg.cityCode}</span>
                            </p>
                            <p>
                                <span>身份证签发地：</span>
                                <span>{cardMsg.signFrom}</span>
                            </p>
                        </div>
                        <div className="photos">
                            <p>
                                <Popover content={PopImage(cardMsg.frontPhoto)} placement="right" trigger="click"
                                    autoAdjustOverflow={false}
                                    title="正面照片"
                                >
                                    <img src={cardMsg.frontPhoto} alt="" style={{ width: "100%" }} />
                                </Popover>
                            </p>
                            <p>
                                <Popover content={PopImage(cardMsg.backPhoto)} placement="right" trigger="click"
                                    autoAdjustOverflow={false}
                                    title="反面照片"
                                >
                                    <img src={cardMsg.backPhoto} alt="" style={{ width: "100%" }} />
                                </Popover>
                            </p>
                            <p>
                                <Popover content={PopImage(cardMsg.handPhoto)} placement="right" trigger="click"
                                    autoAdjustOverflow={false}
                                    title="手持照片"
                                >
                                    <img src={cardMsg.handPhoto} alt="" style={{ width: "100%" }} />
                                </Popover>
                            </p>
                        </div>

                    </div>
                </Modal>
            </div >
        )
    }
}
