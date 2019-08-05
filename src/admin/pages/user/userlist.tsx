import * as React from 'react';
import {
    Table, message, Breadcrumb, Modal 
} from 'antd';
import './index.less';
import moment from 'moment'
import axios from '../../util/Axios';
import { apiGetUserList } from '../api';

const UserTypeList = ["普通用户", "商户", "企业用户"]

const IsAuthentList = ["否", "是"]

const StatusList = ["正常", "停用"]

const PopImage = (imgSrc: string) => (
    <img src={imgSrc} alt="" style={{ width: "100%" }} />
)

export default class UserList extends React.Component<any, any> {

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
        editVisible: false,
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
        total: 0,
        searchText:""
    };

    public getUserList = (page: number, size: number) => {
        const That = this
        apiGetUserList(page, size).then((res: any) => {
            if (res && res.data.length > 0) {
                const tableData = res.data.map((item: any, index: number) => {
                    return {
                        key: item.id,  // key 应带对应data id 
                        userType: item.type ? UserTypeList[item.type] : UserTypeList[0],
                        userName: item.username,
                        nickName: item.nickname,
                        phone: item.phone ? item.phone : "----",
                        authent: item.authent ? IsAuthentList[item.authent] : IsAuthentList[0],
                        icon: item.icon ? item.icon : "----",
                        status: item.status ? StatusList[item.status] : StatusList[0],
                        regtime: item.regtime ? moment(parseInt(item.regtime, 10)).format('YYYY-MM-DD H:mm:ss') : "----",
                        lastlogintime: item.lastlogintime ? moment(parseInt(item.lastlogintime, 10)).format('YYYY-MM-DD H:mm:ss') : "----",
                        operation: ""
                    }
                })
                That.setState({
                    "tableData": tableData,
                    resTableData: res.goodList,
                    total: res.total
                })
            }
        })
    }

    public componentDidMount() {
        const { page } = this.props.match.params
        this.getUserList(page, 10)
    }

    public onSelectChange = (selectedRowKeys: any) => {
        this.setState({ selectedRowKeys });
    }

    public handleChange = (pagination: any, filters: any, sorter: any) => {
        this.props.history.push(`/home/userlist/${pagination.current}`)
        this.getUserList(pagination.current, pagination.pageSize)
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

    public editGoodType = (record: any) => {
        console.log(record.size === "----", record)
        this.setState({
            editVisible: true,
            editSizeVisible: record.size !== "----",
            defaultProductName: record.name,
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
            if (res) {
                message.success("删除成功")
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            } else {
                message.error("删除失败")
            }
        })

    }
    public render() {

        const { selectedRowKeys, tableData, total } = this.state;

        const That = this

        let { filteredInfo }: any = this.state;

        filteredInfo = filteredInfo || {};

        const columns = [{
            title: '用户类型',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '昵称',
            dataIndex: 'nickName',
            key: 'nickName',
            filteredValue: filteredInfo.nickName || null,
            onFilter: (value: string, record: any) => {
                return record.nickName.toString().includes(value)
            },
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
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '注册时间',
            dataIndex: 'regtime',
            key: 'regtime',
        }, {
            title: '最后登陆时间',
            dataIndex: 'lastlogintime',
            key: 'lastlogintime',
        }, {
            title: '实名认证',
            dataIndex: 'authent',
            key: 'authent',
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        },
            // {
            //     title: '操作',
            //     dataIndex: 'operation',
            //     key: 'operation',
            //     render: (text: any, record: any) => {
            //         return (
            //             <a href="javascript:;" onClick={this.editGoodType.bind(this, record)}>详细</a>
            //         )
            //     }
            // }
        ];

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        // const hasSelected = selectedRowKeys.length > 0
        const { page } = this.props.match.params
        return (
            <div>
                <Breadcrumb style={{ textAlign: "left", marginBottom: 25 }}>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">用户列表</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                {/* <div style={{ marginBottom: 16, textAlign: "left" }}>
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
                </div> */}
                <div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={tableData}
                        pagination={{ pageSize: 10, "total": total, defaultCurrent: parseInt(page, 10) }}
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
            </div >
        )
    }
}
