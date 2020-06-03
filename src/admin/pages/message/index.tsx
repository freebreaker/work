import * as React from 'react';
import { useEffect, useState } from 'react'
import { Button, Table, Drawer, Form, Radio, Select, Input, Icon, message, Modal, Breadcrumb } from 'antd';
import { apiPostPicture, apiEditPicture, apiDeletePicture, apiGetMessageList, apiDeleteMessage, apiDeal } from '../api';
import { hasErrors } from '../../util/hasErrors';
import { PositonBox } from '../../components/PositionBox';
import { DealBox } from '../../components/DealBox';
import moment from 'moment'
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const { Option } = Select;

const { TextArea } = Input

const MessageWrap = (props: any) => {

    const [tableData, setTableData] = useState([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const [addVisible, setAddVisible] = useState(false)

    const [fileList, setFileList] = useState<any[]>([])

    const [deal, setDeal] = useState(false)

    const [edit, setEdit] = useState(false)

    const [editId, setEditId] = useState('')

    const [editImgSrc, setEditImgSrc] = useState()

    const [showImage, setShowImage] = useState(false)

    const [imgSrc, setImgSrc] = useState()  // 弹出层图片

    useEffect(() => {
        apiGetMessageList(1, 10).then((res: any) => {
            if (res) {
                const data = res.data.map((item: any, index: number) => {
                    return {
                        key: item.id,
                        // name: item.name,
                        // phone: item.phone,
                        message: item.content,
                        createdAt: item.createTime,
                        // cuser: item.cuser ? item.cuser.name : "----",
                        // dealTime: item.updateTime,
                    }
                })
                setTableData(data)
            }
        })
    }, []);

    const addPic = () => {
        setAddVisible(true)
    }

    const delMessage = () => {
        apiDeleteMessage(selectedRowKeys).then((res: any) => {
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
                apiDeal(editId, values.deal, values.remark).then((res: any) => {
                    if (res) {
                        message.success("编辑成功")
                        setTimeout(() => {
                            window.location.reload()
                        }, 500)
                    } else {
                        message.error("编辑失败")
                    }
                })
            }
        });
    };

    const hasSelected = selectedRowKeys.length > 0;

    const columns = [
        // {
        //     title: '留言者姓名',
        //     dataIndex: 'name',
        //     key: 'name',
        // }, 
        // {
        //     title: '留言者手机号',
        //     dataIndex: 'phone',
        //     key: 'phone',
        // }, 
        {
            title: '留言内容',
            dataIndex: 'message',
            key: 'message',
        }, {
            title: '留言时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (details: any, record: any) => {
                return <span> {moment(record.createdAt).format('LLLL')}</span>
            }
        }, 
        // {
        //     title: '处理时间',
        //     dataIndex: 'dealTime',
        //     key: 'dealTime',
        //     render: (details: any, record: any) => {
        //         return <span >{record.dealTime ? moment(record.dealTime).format('LLLL') : "----"}</span>
        //     }
        // },
        //  {
        //     title: '操作',
        //     render: (details: any, record: any) => {
        //         return (
        //             <a
        //                 onClick={() => {
        //                     setAddVisible(true)
        //                     setEdit(true)
        //                     setEditId(record.key)
        //                     props.form.setFieldsValue({
        //                         deal: record.deal ? record.deal : false,
        //                         remark: record.remark
        //                     });
        //                 }}>
        //                 <DealBox type={record.deal ? 1 : 0} />
        //             </a>
        //         )
        //     }
        // }
    ]
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
            <Breadcrumb style={{ textAlign: "left", marginBottom: 20 }}>
                <Breadcrumb.Item>留言</Breadcrumb.Item>
                <Breadcrumb.Item>
                    留言列表
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginBottom: 16, textAlign: "left" }}>
                <Button type="danger" disabled={!hasSelected} onClick={() => {
                    delMessage()
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
                title={edit ? "处理" : "添加"}
                placement="right"
                closable={true}
                onClose={() => {
                    setAddVisible(false)
                    setEdit(false)
                    setEditId('')
                    props.form.setFieldsValue({
                        deal: false,
                        remark: ""
                    });
                }}
                visible={addVisible}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Item>
                        {props.form.getFieldDecorator('deal', {
                            initialValue: deal,
                            rules: [{ required: true, message: '' }],
                        })(
                            <Radio.Group>
                                <Radio value={false}>未处理</Radio>
                                <Radio value={true}>已处理</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="备注">
                        {props.form.getFieldDecorator('remark', {
                        })(
                            <TextArea rows={6} />
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

const Message = Form.create({ name: 'coordinated' })(MessageWrap);

export default Message