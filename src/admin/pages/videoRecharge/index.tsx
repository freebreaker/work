import * as React from 'react';
import { useEffect, useState } from 'react'
import { Button, Table, Drawer, Form, Input, Select, Upload, Icon, message, Modal } from 'antd';
import { apiGetVideoList, apiDeletePicture, apiAddVideo, apiEditVideo } from '../api';
import { hasErrors } from '../../util/hasErrors';
import { PositonBox } from '../../components/PositionBox';

const { Option } = Select;

const { TextArea } = Input;

const VideoPageWrap = (props: any) => {

    const [tableData, setTableData] = useState([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const [addVisible, setAddVisible] = useState(false)

    const [fileList, setFileList] = useState<any[]>([])

    const [pageValue, setPageValue] = useState()

    const [edit, setEdit] = useState(false)

    const [editId, setEditId] = useState('')

    const [editImgSrc, setEditImgSrc] = useState('')

    const [showImage, setShowImage] = useState(false)

    const [imgSrc, setImgSrc] = useState('')  // 弹出层视频

    useEffect(() => {
        apiGetVideoList().then((res: any) => {
            if (res.data.length > 0) {
                const data = res.data.map((item: any, index: number) => {
                    return {
                        key: item.id,
                        position: item.position,
                        imgSrc: item.cover,
                        description: item.description ? item.description : "----",
                        link: item.link ? item.link : '----',
                        viplink: item.viplink ? item.viplink : '----'
                    }
                })
                setTableData(data)
            }
        })
    }, []);

    const addPic = () => {
        setAddVisible(true)
    }

    const delPic = () => {
        apiDeletePicture(selectedRowKeys).then((res: any) => {
            if (res) {
                message.success("删除成功")
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            } else {
                message.error("删除失败")
            }
        })
    }


    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err: any, values: any) => {
            if (!err) {
                const formData = new FormData();
                if (fileList) {
                    fileList.forEach((file: any) => {
                        formData.append('files', file);
                    });
                }
                formData.append("position", values.type)
                formData.append("description", values.description)
                formData.append("link", values.link)
                formData.append("viplink", values.viplink)
                // apiPostPicture(values.page,values.type,values.fileList)

                if (edit) {
                    formData.append('editId', editId)
                    formData.append("imgSrc", editImgSrc)
                    apiEditVideo(formData).then((res: any) => {
                        if (res) {
                            message.success("编辑成功")
                            // setTimeout(() => {
                            //     window.location.reload()
                            // }, 500)
                        } else {
                            message.error("编辑失败")
                        }
                    })
                } else {
                    apiAddVideo(formData).then((res: any) => {
                        if (res) {
                            message.success("添加成功")
                            // setTimeout(() => {
                            //     window.location.reload()
                            // }, 500)
                        } else {
                            message.error("添加失败")
                        }
                    })
                }

            }
        });
    };

    const hasSelected = selectedRowKeys.length > 0;

    const columns = [
        // {
        //     title: '导航栏页面',
        //     dataIndex: 'page',
        //     key: 'page',
        //     filters: [
        //         {
        //             text: '第1页',
        //             value: '1',
        //         },
        //         {
        //             text: '第2页',
        //             value: '2',
        //         },
        //     ],
        //     filterMultiple: false,
        //     onFilter: (value: any, record: any) => {
        //         console.log(record, value)
        //         return record.page.toString().indexOf(value) === 0
        //     },
        //     render: (details: any, record: any) => {
        //         return (
        //             <span>{`第${record.page}页`}</span>
        //         )
        //     }
        // }, 
        {
            title: '视频位置',
            dataIndex: 'position',
            key: 'position',
            filters: [
                {
                    text: 'banner',
                    value: '1',
                },
                {
                    text: '中间',
                    value: '2',
                },
                {
                    text: '底部',
                    value: '3',
                },
            ],
            filterMultiple: false,
            onFilter: (value: any, record: any) => {
                console.log(record, value)
                return record.position.toString().indexOf(value) === 0
            },
            render: (details: any, record: any) => {
                return (
                    <PositonBox type={record.position - 1} />
                )
            }
        }, {
            title: '视频封面',
            dataIndex: 'imgSrc',
            key: 'imgSrc',
            render: (details: any, record: any) => {
                return (
                    <img src={`${record.imgSrc}`} alt=""
                        style={{ width: 70, cursor: "pointer" }}
                        onClick={() => {
                            setImgSrc(`${record.imgSrc}`)
                            setShowImage(true)
                        }}
                    />
                )
            }
        }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: '普通视频链接',
            dataIndex: 'link',
            key: 'link',
        }, {
            title: 'VIP视频链接',
            dataIndex: 'viplink',
            key: 'viplink',
        }, {
            title: '操作',
            render: (details: any, record: any) => {
                return (
                    <a onClick={() => {
                        setAddVisible(true)
                        setEdit(true)
                        setEditId(record.key)
                        setEditImgSrc(record.imgSrc)
                        props.form.setFieldsValue({
                            page: record.page,
                            type: record.position,
                            link: record.link,
                            viplink: record.link,
                        });
                    }}>编辑</a>
                )
            }
        }]
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    };

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const Props = {
        onRemove: (file: any) => {
            //   this.setState(state => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            //     return {
            //       fileList: newFileList,
            //     };
            //   });
            setFileList(newFileList)
        },
        beforeUpload: (file: any) => {
            //   this.setState(state => ({
            //     fileList: [...state.fileList, file],
            //   }));
            if (!fileList) {
                setFileList([...[], file])
                return false
            }

            setFileList([...fileList, file])
            return false;
        },
        // fileList,
    };


    return (
        <div>
            <div style={{ marginBottom: 16, textAlign: "left" }}>
                <Button type="primary" onClick={addPic} style={{ marginRight: 20 }}>
                    添加
                </Button>
                <Button type="danger" disabled={!hasSelected} onClick={() => {
                    delPic()
                }}>
                    删除
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `选择了${selectedRowKeys.length}项` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={tableData}
                pagination={{ pageSize: 10 }}
                locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }}
            />
            <Drawer
                width={500}
                title={edit ? "编辑" : "添加"}
                placement="right"
                closable={true}
                onClose={() => {
                    setAddVisible(false)
                    setEdit(false)
                    setEditId('')
                    setEditImgSrc('')
                    props.form.setFieldsValue({
                        page: undefined,
                        type: undefined
                    });
                }}
                visible={addVisible}
            >
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} onSubmit={handleSubmit}>
                    {/* <Form.Item label="导航栏">
                        {props.form.getFieldDecorator('page', {
                            initialValue: pageValue,
                            rules: [{ required: true, message: '请选择导航栏' }],
                        })(
                            <Select style={{ width: 320 }} onChange={() => { return }}>
                                <Option value={1}>首页</Option>
                                <Option value={2}>第二页</Option>
                            </Select>
                        )}
                    </Form.Item> */}
                    <Form.Item label="位置">
                        {props.form.getFieldDecorator('type', {
                            rules: [{ required: true, message: '请选择位置' }],
                        })(
                            <Select style={{ width: 320 }} onChange={() => { return }}>
                                <Option value={1}>Banner</Option>
                                <Option value={2}>中间</Option>
                                <Option value={3}>底部</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="描述">
                        {props.form.getFieldDecorator('description', {
                        })(
                            <TextArea rows={6} />
                        )}
                    </Form.Item>
                    <Form.Item label="普通视频链接">
                        {props.form.getFieldDecorator('link', {
                        })(
                            <Input type='text' />
                        )}
                    </Form.Item>
                    <Form.Item label="VIP视频链接">
                        {props.form.getFieldDecorator('viplink', {
                        })(
                            <Input type='text' />
                        )}
                    </Form.Item>
                    <Form.Item label="封面">
                        {props.form.getFieldDecorator('fileList', {
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                        })(
                            <Upload.Dragger name="files" {...Props} style={{ width: 320 }}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">点击上传</p>
                            </Upload.Dragger>
                        )}
                    </Form.Item>
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
                        <Button onClick={() => { setAddVisible(false) }} style={{ marginRight: 8 }}>
                            取消
                        </Button>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(props.form.getFieldsError())}>
                            确认
                        </Button>
                    </div>
                </Form>
            </Drawer>
            <Modal
                visible={showImage}
                onCancel={() => setShowImage(false)}
                footer={null}
                destroyOnClose={true}
            >
                <img src={imgSrc} alt="" style={{ width: "100%" }} />
            </Modal>
        </div>
    )
}

const VideoPage = Form.create({ name: 'coordinated' })(VideoPageWrap);

export default VideoPage