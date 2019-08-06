import * as React from 'react';
import {
    Table, Button, Drawer, Input, Icon, Upload, message, Modal
} from 'antd';
import './index.less';
import axios from '../../../util/Axios';
import { sendToQiniu, concatImageString } from '../../../util/sendToQiniu';
import moment from 'moment'

const { TextArea } = Input;

const Dragger = Upload.Dragger;

const PopImage = (imgSrc: string) => (
    <img src={imgSrc} alt="" style={{ width: "100%" }} />
)

export default class RepellantDivide extends React.Component<any, any> {

    public state = {
        files: [],
        updateId: 1, // edit id 要更新的id
        selectedRowKeys: [], // Check here to configure the default column
        selectedPetKeys: [],
        loading: false,
        filteredInfo: null,
        sortedInfo: "",
        visible: false,
        editVisible: false,
        value: 3,  // 默认选择的一级分类
        imageUrl: "",
        defaultVaccineBrandName: "", // 编辑驱虫名字
        defalutSizeValue: 6, // 编辑驱虫体型
        editSizeVisible: false,  // 编辑驱虫体型选项是否显示
        tableData: [],
        resTableData: [],
        showImage: false,
        imageSrc: "",
        description: ""
    };

    public componentDidMount() {
        const That = this
        axios({
            method: "get",
            url: "/repellant/list"
        }).then((res: any) => {
            if (res.length > 0) {
                const tableData = res.map((item: any, index: number) => {
                    return {
                        key: item.id,  // key 应带对应data id 
                        name: item.name,
                        image: item.image ? item.image : "暂无",
                        description: item.description ? item.description : "----",
                        creatTime: item.ct ? moment(parseInt(item.ct, 10)).format('YYYY-MM-DD H:mm:ss') : "----",
                        modifiedTime: item.mt ? moment(parseInt(item.mt, 10)).format('YYYY-MM-DD H:mm:ss') : "----",
                        operation: ""
                    }
                })
                That.setState({
                    "tableData": tableData,
                    resTableData: res
                })
                console.log(res)
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

    public addVaccineBrand = () => {
        this.showDrawer()
    }

    public editVaccineBrand = (record: any) => {
        console.log(record.size === "----", record)
        this.setState({
            editVisible: true,
            editSizeVisible: record.size !== "----",
            defaultVaccineBrandName: record.name,
            updateId: record.key,
            description: record.description
        })
    }

    public showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    public deleteVaccineBrand = () => {

        const selectedRowKeys = this.state.selectedRowKeys

        axios({
            method: "post",
            url: "/repellant/delete",
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

    public submitVaccineBrand = () => {

        const { defaultVaccineBrandName, imageUrl, description } = this.state

        axios({
            method: "post",
            url: "/repellant/add",
            data: {
                name: defaultVaccineBrandName,
                image: imageUrl,
                "description": description
            }
        }).then((res: any) => {
            if (res) {
                message.success("添加成功")
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            } else {
                message.error("添加失败")
            }
        })

    }

    // 编辑驱虫类型提交

    public editSubmitVaccineBrand = () => {

        const { defaultVaccineBrandName, imageUrl, updateId, description } = this.state

        axios({
            method: "post",
            url: "/repellant/edit",
            data: {
                id: updateId,
                name: defaultVaccineBrandName,
                "description": description,
                image: imageUrl,
            }
        }).then((res: any) => {
            if (res) {
                message.success("修改成功")
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            } else {
                message.error("修改失败")
            }
        })
    }

    public beforeUpload(file: any) {

        const FileList = this.state.files

        this.setState({
            files: [...FileList, file]
        })

        return false;
    }

    public handleUpload = ({ fileList, file }: { fileList: any, file: any }) => {

        const upToken = localStorage.getItem('uploadToken')  // 获得token

        if (upToken) {
            sendToQiniu(file, upToken,'ao') // 发送到七牛
        }

        const ImageString = concatImageString(fileList)


        this.setState({
            files: fileList,
            "imageUrl": ImageString
        })

    }

    public render() {

        const That = this

        const { selectedRowKeys, tableData, description } = this.state;

        let { filteredInfo }: any = this.state;

        filteredInfo = filteredInfo || {};

        const columns = [{
            title: '驱虫名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '图片',
            dataIndex: 'image',
            key: 'image',
            render: (text: any, record: any) => {

                if (record.image !== "") {

                    const imageUrlList = record.image.split(',')

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
            title: '驱虫描述',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: '创建时间',
            dataIndex: 'creatTime',
            key: 'creatTime',
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text: any, record: any) => {
                return (
                    <a href="javascript:;" onClick={this.editVaccineBrand.bind(this, record)}>编辑</a>
                )
            }
        }];

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div>
                <div style={{ marginBottom: 16, textAlign: "left" }}>
                    <Button type="primary" onClick={this.addVaccineBrand.bind(this)} style={{ marginRight: 20 }}>
                        添加
                    </Button>
                    <Button type="danger" disabled={!hasSelected} onClick={() => {
                        this.deleteVaccineBrand()
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
                <div>
                    <Drawer
                        width={500}
                        title="添加驱虫类型"
                        placement="right"
                        closable={true}
                        onClose={() => {
                            this.setState({
                                visible: false,
                                defaultVaccineBrandName: "",
                                description: "",
                                imageSrc: "",
                                updateId: ""
                            })
                        }}
                        visible={this.state.visible}
                    >
                        <div style={{ margin: "20px 0" }}>
                            <span>驱虫名称：</span>
                            <Input style={{ width: "70%" }} placeholder="请输入驱虫名" onChange={(e: any) => { this.setState({ defaultVaccineBrandName: e.target.value }) }} />
                        </div>
                        <div style={{ margin: "20px 0", display: "flex" }}>
                            <span>驱虫描述：</span>
                            <TextArea
                                style={{ width: "70%", height: 120 }}
                                placeholder="请输入驱虫描述"
                                onChange={(e: any) => { this.setState({ description: e.target.value }) }} />
                        </div>
                        <div className="Box">
                            <span>驱虫图片：</span>
                            <Dragger className="Dragger" onChange={this.handleUpload} beforeUpload={this.beforeUpload.bind(this)}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-hint">点击或拖拽图片至此处</p>
                            </Dragger>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e9e9e9',
                                padding: '10px 16px',
                                background: '#fff',
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                            <Button onClick={() => {
                                this.setState({ visible: true })
                                this.submitVaccineBrand()
                            }}
                                type="primary">
                                确定
                            </Button>
                        </div>
                    </Drawer>
                </div>
                <div>
                    <Drawer
                        width={500}
                        title="编辑驱虫类型"
                        placement="right"
                        closable={true}
                        onClose={() => {
                            this.setState({
                                visible: false,
                                defaultVaccineBrandName: "",
                                description: "",
                                imageSrc: "",
                                updateId: ""
                            })
                        }}
                        visible={this.state.editVisible}
                    >
                        <div>
                            <span>驱虫分类：</span>
                            <Input style={{ width: "70%" }} placeholder="请输入分类名" onChange={(e: any) => { this.setState({ defaultVaccineBrandName: e.target.value }) }}
                                defaultValue={this.state.defaultVaccineBrandName}
                                value={this.state.defaultVaccineBrandName}
                            />
                        </div>
                        <div style={{ margin: "20px 0", display: "flex" }}>
                            <span>驱虫描述：</span>
                            <TextArea
                                defaultValue={description}
                                style={{ width: "70%", height: 120 }}
                                placeholder="请输入驱虫描述"
                                onChange={(e: any) => { this.setState({ description: e.target.value }) }} />
                        </div>
                        <div className="Box">
                            <span>驱虫图片：</span>
                            <Dragger className="Dragger" onChange={this.handleUpload}
                                beforeUpload={this.beforeUpload.bind(this)}
                            >
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-hint">点击或拖拽图片至此处</p>
                            </Dragger>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e9e9e9',
                                padding: '10px 16px',
                                background: '#fff',
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={() => { this.setState({ editVisible: false }) }} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                            <Button onClick={() => {
                                this.editSubmitVaccineBrand()
                            }}
                                type="primary">
                                确认
                            </Button>
                        </div>
                    </Drawer>
                    <Modal
                        visible={this.state.showImage}
                        onCancel={() => this.setState({ showImage: false })}
                        footer={null}
                    >
                        {PopImage(this.state.imageSrc)}
                    </Modal>
                </div>
            </div >
        )
    }
}
