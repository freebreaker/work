import * as React from 'react';
import { useEffect, useState } from 'react'
import { Button, Table, Drawer, Form, Input, message, Breadcrumb, Modal } from 'antd';
import { apiDeleteMessage, apiGetNews, apiAddNews, apiEditNews } from '../api';
import { hasErrors } from '../../util/hasErrors';
import moment from 'moment'
import * as ReactQuill from 'react-quill'; // Typescript
import 'react-quill/dist/quill.snow.css';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const NewsWrap = (props: any) => {

    const [tableData, setTableData] = useState([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const [addVisible, setAddVisible] = useState(false)

    const [edit, setEdit] = useState(false)

    const [editId, setEditId] = useState()

    const [showImage, setShowImage] = useState(false)

    const [Html, setHtml] = useState()

    const [text, setText] = useState('')

    useEffect(() => {
        apiGetNews().then((res: any) => {
            if (res && res.length > 0) {
                const data = res.map((item: any, index: number) => {
                    return {
                        key: item.id,
                        title: item.title,
                        content: item.content,
                        createdAt: item.createdAt,
                        cuser: item.cuser ? item.cuser.name : "----",
                    }
                })

                setTableData(data)
            }
        })
    }, []);

    const addNew = () => {
        setAddVisible(true)
    }

    const delNews = () => {
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
                const P = edit?apiEditNews(editId,values.title, text):apiAddNews(values.title, text)
                P.then((res: any) => {
                    if (res) {
                        message.success("操作成功")
                        setTimeout(() => {
                            window.location.reload()
                        }, 500)
                    } else {
                        message.error("操作失败")
                    }
                })
            }
        });
    };

    const hasSelected = selectedRowKeys.length > 0;

    const columns = [{
        title: '新闻标题',
        dataIndex: 'title',
        key: 'title',
    }, {
        title: '新闻内容',
        dataIndex: 'content',
        key: 'content',
        render: (details: any, record: any) => {
            // return <div className="output-content">{BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>').toHTML()}</div>
            return <a onClick={() => {
                setShowImage(true)
                setHtml(record.content)
            }}>点击显示</a>
        }

    }, {
        title: '留言时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (details: any, record: any) => {
            return <div> {moment(record.createdAt).format('LLLL')}</div>
        }
    }, {
        title: '创建人',
        dataIndex: 'cuser',
        key: 'cuser',
    }, {
        title: '操作',
        render: (details: any, record: any) => {
            return (
                <a
                    onClick={() => {
                        setAddVisible(true)
                        setEdit(true)
                        setEditId(record.key)
                        setText(record.content)
                        props.form.setFieldsValue({
                            title: record.title,
                        });
                    }}>
                    编辑
                    </a>
            )
        }
    }]
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    };

    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media']

    return (
        <div>
            <Breadcrumb style={{ textAlign: "left", marginBottom: 20 }}>
                <Breadcrumb.Item>管理</Breadcrumb.Item>
                <Breadcrumb.Item>
                    新闻中心
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginBottom: 16, textAlign: "left" }}>
                <Button type="primary" onClick={addNew} style={{ marginRight: 20 }}>
                    添加
                </Button>
                <Button type="danger" disabled={!hasSelected} onClick={() => {
                    delNews()
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
                width={800}
                title={edit ? "处理" : "添加"}
                placement="right"
                closable={true}
                onClose={() => {
                    setAddVisible(false)
                    setEdit(false)
                    setEditId(undefined)
                    setText("")
                    props.form.setFieldsValue({
                        title:""
                    });
                }}
                visible={addVisible}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Item label="标题">
                        {props.form.getFieldDecorator('title', {
                            initialValue: "",
                            rules: [{ required: true, message: '请输入新闻标题' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <ReactQuill.default
                        style={{
                            height: 500
                        }}
                        placeholder="请输入正文"
                        value={text}
                        modules={{
                            toolbar: [
                                [{ 'header': [1, 2, false] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                ['link', 'image'],
                                ['clean']
                            ],
                        }}
                        formats={[
                            'header',
                            'bold', 'italic', 'underline', 'strike', 'blockquote',
                            'list', 'bullet', 'indent',
                            'link', 'image'
                        ]}
                        onChange={(value: any) => {
                            setText(value)
                        }} />
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
                width={800}
                visible={showImage}
                onCancel={() => setShowImage(false)}
                footer={null}
                destroyOnClose={true}
            >
                <div id="modal" dangerouslySetInnerHTML={{__html: Html}} />
            </Modal>
        </div>
    )
}

const News = Form.create({ name: 'coordinated' })(NewsWrap);

export default News