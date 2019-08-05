import * as React from 'react';
import {
    Table, Button, Drawer, Form, Input, message, Breadcrumb, Select, Switch, InputNumber, Upload, Icon
} from 'antd';
import './index.less';
import axios from '../../util/Axios';

// const RadioGroup = Radio.Group;
// const Dragger = Upload.Dragger;
const { Option } = Select;

const Dragger = Upload.Dragger;

const { TextArea } = Input;

class AppUploadWrap extends React.Component<any, any> {

    public state = {
        updateId: 1, // edit id 要更新的id
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        filteredInfo: null,
        sortedInfo: "",
        visible: false,
        editVisible: false,
        value: 2,  // 默认选择的一级分类
        editSizeVisible: false,
        tableData: [],
        resTableData: [],
        initDeviceValue: "1",// 默认设备类型 1 安卓  2 苹果
        name: "宠都", // 应用名
        fileName: "", // 文件名
        appId: "", // appId 
        appCode: 5, // app 代码 gitee链接
        appVersion: "",
        appUrl: "",
        description: "",
        forces: false,
        cuserId: "",
        muserId: "",
        createTime: "",
        modifiedTime: "",
    };

    public componentDidMount() {
        const That = this

        axios({
            method: "get",
            url: "/app/versions"
        }).then((res: any) => {
            if (res.length > 0) {
                const tableData = res.map((item: any, index: number) => {
                    return {
                        key: item.id,  // key 应带对应data id 
                        name: "宠都APP",
                        type: item.deviceType === 1 ? "安卓" : "苹果",
                        fileName: item.fileName ? item.fileName : "----",
                        appId: item.appId ? item.appId : "----",
                        appCode: item.appCode ? item.appCode : "----",
                        appVersion: item.appVersion ? item.appVersion : "----",
                        appUrl: item.url ? item.url : "----",
                        description: item.description ? item.description : "----",
                        forces: item.forces ? "是" : "否",
                        creater: item.cuserId ? item.cuserId : "----",
                        laster: item.muserId ? item.muserId : "----",
                        operation: ""
                    }
                })
                That.setState({
                    "tableData": tableData,
                    // resTableData: res.data
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

    public editAppMsgs = (record: any) => {
        console.log(record.size === "----", record)
        this.setState({
            editVisible: true,
            editSizeVisible: record.size !== "----",
            defaultPetName: record.name,
            updateId: record.key
        })
    }

    public showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    public deleteAppVersion = () => {

        const selectedRowKeys = this.state.selectedRowKeys

        console.log(selectedRowKeys)

        axios({
            method: "post",
            url: "/app/delete",
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

    public submitAppVersionMsgs = () => {

        message.success('校验成功');

        const { name, fileName, initDeviceValue, appId, appCode, appVersion, appUrl, description, forces } = this.state

        axios({
            method: "post",
            url: "/app/upload",
            data: {
                "name": name,
                "fileName": fileName,
                "deviceType": parseInt(initDeviceValue, 10),
                "appId": appId,
                "appCode": appCode.toString(),
                "appVersion": appVersion,
                "appUrl": appUrl,
                "description": description,
                "forces": forces ? 1 : 0,
                "cuserId": "cuserId",
                "muserId": "muserId",
            },
        }).then((res: any) => {
            if (res) {
                message.success("添加成功")
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            } else {
                message.error("添加失败")
            }
        })

    }


    public downloadApk = (record: any) => {

        const { appUrl } = record

        if (appUrl) {
            axios({
                method: "get",
                url: `/app/download?name=${record.fileName}`,
                responseType: "blob",
            }).then((res: any) => {
                const objUrl = URL.createObjectURL(res)
                const a = document.createElement("a");
                document.body.appendChild(a);
                a.href = objUrl;
                a.download = `${record.fileName}.apk`
                a.click();
                window.URL.revokeObjectURL(objUrl);
                // window.location.href = objUrl

            })
        } else {

            message.error("没有此下载路径")

        }
    }

    public render() {

        const That = this

        const { name, selectedRowKeys, tableData, initDeviceValue, appId, appCode, appVersion, forces ,description } = this.state;

        let { filteredInfo }: any = this.state;

        filteredInfo = filteredInfo || {};

        const columns = [{
            title: '应用名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '设备类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '文件名',
            dataIndex: 'fileName',
            key: 'fileName',
        }, {
            title: 'app标识',
            dataIndex: 'appId',
            key: 'appId',
        }, {
            title: '应用版本代码',
            dataIndex: 'appCode',
            key: 'appCode',
        }, {
            title: '对外版本',
            dataIndex: 'appVersion',
            key: 'appVersion',
        }, {
            title: '升级链接',
            dataIndex: 'appUrl',
            key: 'appUrl',
            render: (text: any, record: any) => {
                return (
                    <a href="javascript:;" onClick={this.downloadApk.bind(this, record)}
                        target="_blank"
                    >点此下载</a>
                    // <a href={`http://localhost:4000/app/download/name=${record.fileName}`} target="_blank">点此下载</a>
                )
            }
        }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: '是否强制更新',
            dataIndex: 'forces',
            key: 'forces',
        }, {
            title: '创建者',
            dataIndex: 'creater',
            key: 'creater',
        }, {
            title: '最后修改者',
            dataIndex: 'laster',
            key: 'laster',
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
                return (
                    <a href="javascript:;" onClick={this.editAppMsgs.bind(this, record)}>编辑</a>

                )
            }
        }];

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        const hasSelected = selectedRowKeys.length > 0;


        const token = localStorage.getItem("token")

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const props = {
            name: 'file',
            multiple: true,
            action: '/app/apk',
            data: {
                "appVersion": appVersion
            },
            withCredentials: true,
            headers: {
                Authorization: token ? token : ""
            },
            onChange(info: any) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    // console.log(info.file, info.fileList);
                    if(info.fileList.length === 0){
                        That.setState({
                            appUrl: "",
                            fileName: ""
                        })
                    }
                }
                if (status === 'done') {
                    message.success(`${info.file.name} 上传成功`);
                    That.setState({
                        appUrl: info.file.response.filePath,
                        fileName: info.file.response.fileName
                    })
                } else if (status === 'error') {
                    message.error(`${info.file.name} 上传失败`);
                }
            },
        };
        return (
            <div>
                <Breadcrumb style={{ textAlign: "left", marginBottom: 25 }}>
                    <Breadcrumb.Item>APP上传</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">安卓</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ marginBottom: 16, textAlign: "left" }}>
                    <Button type="primary" onClick={this.showDrawer.bind(this)} style={{ marginRight: 20 }}>
                        添加
                    </Button>
                    <Button type="danger" disabled={!hasSelected} onClick={() => {
                        this.deleteAppVersion()
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
                        width={600}
                        title="添加APP版本"
                        placement="right"
                        closable={true}
                        onClose={() => { this.setState({ visible: false }) }}
                        visible={this.state.visible}
                    >
                        <Form {...formItemLayout}>
                            <Form.Item label="应用名" hasFeedback={true}>
                                {getFieldDecorator('fileName', {
                                    initialValue: name,
                                    setFieldsValue: name,
                                    rules: [{ required: true, message: '请输入应用名!' }],
                                })(
                                    <Input placeholder="例如：宠都" onChange={(e: any) => this.setState({ name: e.target.value })} />
                                )}
                            </Form.Item>

                            <Form.Item label="手机系统" hasFeedback={true}>
                                {getFieldDecorator('deviceType', {
                                    initialValue: initDeviceValue,
                                    rules: [
                                        { required: true, message: '请选择系统' },
                                    ],
                                })(
                                    <Select onSelect={(value: any) => this.setState({ initDeviceValue: value })}>
                                        <Option value="1">安卓</Option>
                                        <Option value="2">苹果</Option>
                                    </Select>,
                                )}
                            </Form.Item>

                            <Form.Item label="appId" hasFeedback={true}>
                                {getFieldDecorator('appId', {
                                    setFieldsValue: appId,
                                    rules: [{ required: true, message: '请输入appId!' }],
                                })(
                                    <Input placeholder="例如：abc" onChange={(e: any) => this.setState({ appId: e.target.value })} />
                                )}
                            </Form.Item>

                            <Form.Item label="对外版本" hasFeedback={true}>
                                {getFieldDecorator('appVersion', {
                                    setFieldsValue: appVersion,
                                    rules: [{ required: true, message: '对外版本!' }],
                                })(
                                    <Input placeholder="例如:2.0.0"
                                        onChange={(e: any) => this.setState({ appVersion: e.target.value })} />
                                )}
                            </Form.Item>

                            <Form.Item label="版本代码" hasFeedback={true}>
                                {getFieldDecorator('appCode', {
                                    setFieldsValue: appCode,
                                    initialValue: appCode,
                                    rules: [{ required: true, message: '版本代码!' }],
                                })(
                                    <InputNumber min={1} max={10} onChange={(value: any) => this.setState({ appCode: value })} />
                                )}
                            </Form.Item>

                            {/* <Form.Item label="升级链接" hasFeedback={true}>
                                {getFieldDecorator('appUrl', {
                                    setFieldsValue: appUrl,
                                    initialValue: appUrl,
                                    rules: [{ required: true, message: '升级链接!' }],
                                })(
                                    <Input placeholder="例如:sssss" onChange={(e: any) => this.setState({ appUrl: e.target.value })} />
                                )}
                            </Form.Item> */}
                            <Form.Item label="版本更新内容">
                                {getFieldDecorator('description',
                                    {
                                        valuePropName: 'checked',
                                        initialValue: description,
                                        setFieldsValue: description
                                    })(
                                        <TextArea rows={4} 
                                        onChange={(e:any)=>this.setState({
                                            description:e.target.value
                                        })}/>
                                    )}
                            </Form.Item>         
                            <Form.Item label="是否强制更新">
                                {getFieldDecorator('forces',
                                    {
                                        valuePropName: 'checked',
                                        initialValue: forces,
                                        setFieldsValue: forces
                                    })(
                                        <Switch onChange={() => this.setState({ forces: !forces })} />
                                    )}
                            </Form.Item>
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">上传apk</p>
                                <p className="ant-upload-hint">
                                    支持拖拽上传
                                </p>
                            </Dragger>

                        </Form>
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
                                this.props.form.validateFields((err: any) => {
                                    if (!err) {
                                        this.setState({ visible: true })
                                        this.submitAppVersionMsgs()
                                    }
                                });
                            }}
                                type="primary">
                                确定
                            </Button>
                        </div>
                    </Drawer>
                </div>
            </div >
        )
    }
}


const AppUpload = Form.create({ name: 'validate_other' })(AppUploadWrap);

export default AppUpload