import * as React from 'react';
import {
    Table, Button, Drawer, Radio, Cascader, Input, Icon, Upload, message ,Modal
} from 'antd';
import { getPetTypeOptions } from '../../../util/petTypeOptions';
import './index.less';
import axios from '../../../util/Axios';
import { sendToQiniu, concatImageString } from '../../../util/sendToQiniu';
import moment from 'moment'

const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;

const PopImage = (imgSrc: string) => (
    <img src={imgSrc} alt="" style={{ width: "100%" }} />
)

export default class ServiceDivide extends React.Component<any, any> {

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
        defaultServiceName: "", // 编辑服务名字
        defalutSizeValue: 6, // 编辑服务体型
        editSizeVisible: false,  // 编辑服务体型选项是否显示
        tableData: [],
        resTableData: [],
        resPetTypeTableData: [],
        showImage: false,
        imageSrc: "",
    };

    public componentDidMount() {
        const That = this
        axios({
            method: "get",
            url: "/service/list"
        }).then((res: any) => {
            if (res && res.length > 0) {
                const tableData = res.map((item: any, index: number) => {
                    return {
                        key: item.id,  // key 应带对应data id 
                        name: item.name,
                        image: item.img ? item.img : "",
                        kinds: `${item.level}级分类`,
                        status: item.status ? item.status : "----",
                        creatTime: item.ct ? moment(parseInt(item.ct,10)).format('YYYY-MM-DD H:mm:ss') : "----",
                        modifiedTime: item.mt ? moment(parseInt(item.mt,10)).format('YYYY-MM-DD H:mm:ss') : "----",
                        operation: ""
                    }
                })
                That.setState({
                    "tableData": tableData,
                    resTableData: res
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

    public addServiceType = () => {
        this.showDrawer()
    }

    public editServiceType = (record: any) => {
        this.setState({
            editVisible: true,
            defaultServiceName: record.name,
            updateId: record.key
        })
    }

    public showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    public deleteServiceType = () => {

        const selectedRowKeys = this.state.selectedRowKeys

        axios({
            method: "post",
            url: "/service/delete",
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

    public submitServiceType = () => {

        const { defaultServiceName, selectedPetKeys, imageUrl, value } = this.state

        const PID = selectedPetKeys[1] ? this.state.selectedPetKeys[1] : -1

        axios({
            method: "post",
            url: "/service/add",
            data: {
                name: defaultServiceName,
                pid: PID,
                img: imageUrl,
                level: value,
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
    public editSubmitServiceType = () => {

        const { defaultServiceName, imageUrl, updateId } = this.state

        axios({
            method: "post",
            url: "/service/edit",
            data: {
                id: updateId,
                name: defaultServiceName,
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
            "imageUrl": ImageString,
        })

    }
    public render() {

        const { selectedRowKeys, editSizeVisible, defalutSizeValue, tableData, resTableData, files } = this.state;

        let { filteredInfo }: any = this.state;

        filteredInfo = filteredInfo || {};

        const columns = [{
            title: '服务分类',
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
                            this.setState({
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
            title: '服务种类',
            dataIndex: 'kinds',
            key: 'kinds',
            filters: [
                { text: '1级分类', value: '1' },
                { text: '2级分类', value: '2' },
            ],
            filteredValue: filteredInfo.kinds || null,
            onFilter: (Value: string, record: any) => record.kinds.toString().includes(Value),
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '创建时间',
            dataIndex: 'creatTime',
            key: 'creatTime',
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
                    <a href="javascript:;" onClick={this.editServiceType.bind(this, record)}>编辑</a>
                )
            }
        }];

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        const hasSelected = selectedRowKeys.length > 0;

        const Options = getPetTypeOptions(resTableData, this.state.value)

        return (
            <div>
                <div style={{ marginBottom: 16, textAlign: "left" }}>
                    <Button type="primary" onClick={this.addServiceType.bind(this)} style={{ marginRight: 20 }}>
                        添加
                    </Button>
                    <Button type="danger" disabled={!hasSelected} onClick={() => {
                        this.deleteServiceType()
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
                        title="添加服务类型"
                        placement="right"
                        closable={true}
                        onClose={() => { this.setState({ visible: false, files: [] }) }}
                        visible={this.state.visible}
                    >
                        <RadioGroup onChange={(e: any) => { this.setState({ value: e.target.value }) }} value={this.state.value}>
                            <Radio value={1}>根目录</Radio>
                            <Radio value={2}>宠物种类</Radio>
                        </RadioGroup>
                        <div style={{ margin: "20px 0" }}>
                            {Options ? <span>层级：</span> : ""}
                            {Options ?
                                <Cascader style={{ width: "70%" }} options={Options} onChange={(val: any) => this.setState({ selectedPetKeys: val })} placeholder="选择上一层级" />
                                : ""}
                        </div>
                        <div>
                            <span>分类：</span>
                            <Input style={{ width: "70%" }} placeholder="请输入分类名" onChange={(e: any) => { this.setState({ defaultServiceName: e.target.value }) }} />
                        </div>
                        <div className="Box">
                            <span>图片：</span>
                            <Dragger className="Dragger"
                                fileList={files}
                                beforeUpload={this.beforeUpload.bind(this)}
                                onChange={this.handleUpload}
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
                            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                            <Button onClick={() => {
                                this.setState({ visible: true })
                                this.submitServiceType()
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
                        title="编辑服务类型"
                        placement="right"
                        closable={true}
                        onClose={() => { this.setState({ editVisible: false, files: [] }) }}
                        visible={this.state.editVisible}
                    >
                        <div>
                            <span>分类：</span>
                            <Input style={{ width: "70%" }} placeholder="请输入分类名" onChange={(e: any) => { this.setState({ defaultServiceName: e.target.value }) }}
                                defaultValue={this.state.defaultServiceName}
                                value={this.state.defaultServiceName}
                            />
                        </div>
                        <div className="Box">
                            <span>图片：</span>
                            <Dragger
                                className="Dragger"
                                fileList={files}
                                beforeUpload={this.beforeUpload.bind(this)}
                                onChange={this.handleUpload}
                            >
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-hint">点击或拖拽图片至此处</p>
                            </Dragger>
                        </div>
                        {
                            editSizeVisible ?
                                <div>
                                    <span>体型：</span>
                                    <RadioGroup onChange={(e: any) => { this.setState({ defalutSizeValue: e.target.value }) }} value={defalutSizeValue}>
                                        <Radio value={6}>大型犬</Radio>
                                        <Radio value={7}>中型犬</Radio>
                                        <Radio value={8}>小型犬</Radio>
                                    </RadioGroup>
                                </div> : ""
                        }
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
                                // petTypesUpdateMutation()
                                this.editSubmitServiceType()
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
