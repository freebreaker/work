import * as React from 'react';
import { useEffect, useState } from 'react'
import { Button, Table, Drawer, Form, Input, Select } from 'antd';
import { apiGetPictureList } from '../api';
import { hasErrors } from '../../util/hasErrors';

const { Option } = Select;

const FirstPageBannerWrap = (props: any) => {

    const [tableData,] = useState([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const [addVisible, setAddVisible] = useState(false)

    useEffect(() => {
        apiGetPictureList().then((res: any) => {
            if (res) {
                console.log(res)
            }
        })
    }, []);

    const addPic = () => {
        setAddVisible(true)
    }

    const delPic = () => {
        console.log(32)
    }

    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    const hasSelected = selectedRowKeys.length > 0;

    const columns = [
        {
            title: '导航栏页面',
            dataIndex: 'page',
            key: 'page',
        }, {
            title: '图片位置',
            dataIndex: 'name',
            key: 'name',
        }]
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
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
                title="添加"
                placement="right"
                closable={true}
                onClose={() => {
                    setAddVisible(false)
                }}
                visible={!addVisible}
            >
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmit}>
                    <Form.Item label="导航栏">
                        {props.form.getFieldDecorator('page', {
                            rules: [{ required: true, message: '请选择导航栏' }],
                        })(
                            <Select style={{ width: 320 }} onChange={() => { return }}>
                                <Option value={1}>首页</Option>
                                <Option value={2}>第二页</Option>
                            </Select>
                        )}
                    </Form.Item>
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
        </div>
    )
}

const FirstPageBanner = Form.create({ name: 'coordinated' })(FirstPageBannerWrap);

export default FirstPageBanner