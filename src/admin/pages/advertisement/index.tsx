import * as React from 'react';
import { useEffect, useState } from 'react'
import {
    Table, Button, Drawer, Radio, Input,
    Icon, Upload, message, Modal, Breadcrumb,
    Tag
} from 'antd';
import { apiGetAdvertisementList, apiPostAdvertisement, apiDeleteAdvertisement, apiEditAdvertisement } from '../api';
import moment from 'moment'
import { RelateTypeBox } from './relateTypeBox';
import { AdvertisementDetail } from './detail';
import './index.less';
import { sendToQiniu, concatImageString } from '../../util/sendToQiniu';
// const { Paragraph } = Typography;

const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;
const TextArea = Input.TextArea;

const PopImage = (imgSrc: string) => (
    <img src={imgSrc} alt="" style={{ width: "100%" }} />
)

export const AdvertisementList = (props: any) => {
    const [tableData, setTableData] = useState([]);
    const [page] = useState(0)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [show, setShow] = useState(false)
    const [advertisementId , setAdverttisementId] = useState()
    const [relateType, setRelateType] = useState(1)
    const [relateId, setRelateId] = useState("")
    const [showImage, setShowImage] = useState(false)
    const [imageSrc, setImageSrc] = useState("")
    const [drawerShow, setDrawerShow] = useState(false)
    const [title, setTitle] = useState("")
    const [advertisementType, setAdvertisementType] = useState(1)
    const [advertisementRelateType, setAdvertisementRelateType] = useState(1)
    const [files, setFileList] = useState([{}])
    const [picUrl, setPicUrl] = useState("")
    const [content, setContent] = useState("")
    const [cityCode] = useState("00000")
    const [total, setTotal] = useState(0)
    const [drawerEditShow,setDrawerEditShow] = useState(false)
    // const [sortedInfo] = useState({
    //     order:""
    // })
    const clearData = ()=>{
        setTitle("")
        setAdvertisementType(1)
        setAdvertisementRelateType(1)
        setFileList([{}])
        setPicUrl("")
        setContent("")
        setDrawerShow(false)
        setDrawerEditShow(false)
        setRelateId("")
    }
    const handleChange = (pagination: any, filters: any, sorter: any) => {
        console.log('Various parameters', pagination, filters, sorter);
        props.history.push(`/home/advertisement/${pagination.current}`)
        getAdvertisementList(pagination.current, 10)
    }

    const onSelectChange = (SelectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', SelectedRowKeys);
        setSelectedRowKeys(SelectedRowKeys)
    }

    const handleClick = (Type: number, Id: string) => {
        // console.log(relateType,relateId)
        setShow(true)
        setRelateType(Type)
        setRelateId(Id)
    }

    const addAdvertisement = () => {
        setDrawerShow(true)
    }


    /**
     * 
     * @param type 1添加 2编辑
     */
    const submitAddAdvertisement = (type:number,id:number) => {

        if(type===1){
            apiPostAdvertisement(
                advertisementType,
                relateType,
                relateId,
                picUrl,
                title,
                content,
                imageSrc,
                cityCode
            ).then((res: any) => {
                if (res.success) {
                    message.success(res.msg)
                    setTimeout(() => {
                        window.location.reload()
                    }, 500);
                } else {
                    message.error(res.msg)
                }
            })
        }else{
            apiEditAdvertisement(
                id,
                advertisementType,
                relateType,
                relateId,
                picUrl,
                title,
                content,
                imageSrc,
                cityCode,
            ).then((res: any) => {
                if (res.success) {
                    message.success(res.msg)
                    setTimeout(() => {
                        window.location.reload()
                    }, 500);
                } else {
                    message.error(res.msg)
                }
            })
        }
    }

    const deleteAdvertisment = () => {
        apiDeleteAdvertisement(selectedRowKeys).then((res: any) => {
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

    const handleUpload = ({ fileList, file }: { fileList: any, file: any }) => {

        console.log(fileList)

        const upToken = localStorage.getItem('uploadToken')  // 获得token

        if (upToken) {
            sendToQiniu(file, upToken, "ak") // 发送到七牛
        }

        const ImageString = concatImageString(fileList)

        setFileList(fileList)
        setImageSrc(ImageString)

    }

    const beforeUpload = (file: any) => {

        setFileList([...files, file])

        return false;
    }

    const getAdvertisementList = (Page: number, size: number) => {
        apiGetAdvertisementList(Page, size).then((res: any) => {
            if (res && res.data.length > 0) {
                const Data = res.data.map((item: any, index: number) => {
                    return {
                        key: item.id,  // key 应带对应data id 
                        title: item.title ? item.title : "----",
                        content: item.content ? item.content : "----",
                        type: item.type,
                        image: item.image,
                        status: item.status,
                        creatTime: item.ct ? item.ct : "----",
                        modifiedTime: item.mt ? item.mt : '',
                        operation: `----`,
                        picUrl: item.url ? item.url : "",
                        relateId: item.relateId,
                        relateType: item.relateType,
                    }
                })
                setTableData(Data)
                setTotal(res.total)
            }
        })
    }

    useEffect(() => {
        const Page = props.match.params.page
        getAdvertisementList(Page, 10)
    }, []);

    const columns = [{
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    }, {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
    }, {
        title: '封面',
        dataIndex: 'image',
        key: 'image',
        render: (text: any, record: any) => {

            if (record.image !== "") {

                const imageUrlList = record.image.split(',')

                const images = imageUrlList.map((item: string, index: number) => (
                    <a href="javascript:void(0);" key={index} onClick={() => {
                        setShowImage(true)
                        setImageSrc(item)
                    }}>点击查看</a>
                ))

                return images

            } else {

                return <span>暂无</span>

            }

        }
    }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text: any, record: any) => {
            if (record.type === 1) {
                if (record.picUrl) {
                    return (
                        <a href={record.picUrl} target="_blank">广告链接</a>
                    )
                } else {
                    message.error("没有此广告链接")
                }

            } else {
                return (
                    <div onClick={() => handleClick(record.relateType, record.relateId)}>
                        <RelateTypeBox type={record.relateType - 1} />
                    </div>
                )
            }
        }
    }, {
        title: '创建时间',
        dataIndex: 'creatTime',
        key: 'creatTime',
        render: (text: any, record: any) => {
            return (
                <span>{moment(parseInt(record.creatTime, 10)).format('YYYY-MM-DD H:mm:ss')}</span>
            )
        },
        sorter: (a: any, b: any) => parseInt(a.creatTime, 10) - parseInt(b.creatTime, 10),
    }, {
        title: '最后修改时间',
        dataIndex: 'modifiedTime',
        key: 'modifiedTime',
        render: (text: any, record: any) => {
            return (
                <span>
                    {record.modifiedTime ?
                        moment(parseInt(record.modifiedTime, 10)).format('YYYY-MM-DD H:mm:ss')
                        : "----"}
                </span>
            )
        },
    },{
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text: any, record: any) => {
          return (
            <Tag 
            style={{
              textAlign:"center",
              cursor:"pointer"
            }}
            color="#2db7f5"
            onClick={() => {
                setDrawerEditShow(true)
                setAdverttisementId(record.key)
                setTitle(record.title)
                setContent(record.content)
                setImageSrc(record.image)
                setPicUrl(record.picUrl)
                setAdvertisementType(record.type)
                setAdvertisementRelateType(record.relateType)
                setRelateId(record.relateId)
            }}
            >编辑</Tag>
          )
        }
      }];

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div>
            <Breadcrumb style={{ textAlign: "left", marginBottom: 25 }}>
                <Breadcrumb.Item>广告</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">广告列表</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginBottom: 16, textAlign: "left" }}>
                <Button type="primary" onClick={addAdvertisement} style={{ marginRight: 20 }}>
                    添加
                    </Button>
                <Button type="danger" disabled={!hasSelected} onClick={() => {
                    deleteAdvertisment()
                }}>
                    删除
                    </Button>

                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `选择了${selectedRowKeys.length}项` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={tableData}
                pagination={{ pageSize: 10, "total": total, defaultCurrent: page }}
                onChange={handleChange}
                locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }}
            />
            {
                show ?
                    <AdvertisementDetail
                        show={show}
                        relateId={relateId}
                        relateType={relateType}
                        hide={() => setShow(false)}
                    />
                    : ""
            }
            <Modal
                visible={showImage}
                onCancel={() => setShowImage(false)}
                footer={null}
            >
                {PopImage(imageSrc)}
            </Modal>
            <div>
                <Drawer
                    width={500}
                    title="添加广告"
                    placement="right"
                    closable={true}
                    onClose={() =>{ 
                    // setDrawerEditShow(false)
                    clearData()
                    }}
                    visible={drawerShow}
                >
                    <RadioGroup onChange={(e: any) => { setAdvertisementType(e.target.value) }} value={advertisementType}>
                        <Radio value={1}>图片链接</Radio>
                        <Radio value={2}>宠物宠物服务</Radio>
                    </RadioGroup>
                    {
                        advertisementType === 1 ?
                            <div style={{ margin: "20px 0" }}>
                                <span>链接：</span>
                                <Input style={{ width: "70%" }} placeholder="请输入链接地址" onChange={(e: any) => setPicUrl(e.target.value)} />
                            </div> :
                            <div style={{ margin: "20px 0" }}>
                                <RadioGroup onChange={(e: any) => { setAdvertisementRelateType(e.target.value) }} value={advertisementRelateType}>
                                    <Radio value={1}>宠物</Radio>
                                    <Radio value={2}>商品</Radio>
                                    <Radio value={3}>服务</Radio>
                                </RadioGroup>
                            </div>
                    }
                    {
                        advertisementType === 2 ?
                            <div style={{ margin: "20px 0" }}>
                                <span>关联：</span>
                                <Input style={{ width: "70%" }} placeholder="请输入ID" onChange={(e: any) => setRelateId(e.target.value)} />
                            </div> :
                            ""
                    }
                    <div style={{ margin: "20px 0" }}>
                        <span>标题：</span>
                        <Input style={{ width: "70%" }} placeholder="请输入分类名" onChange={(e: any) => setTitle(e.target.value)} />
                    </div>
                    <div className="Box">
                        <span>图片：</span>
                        <Dragger className="Dragger" onChange={handleUpload} beforeUpload={beforeUpload}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-hint">点击或拖拽图片至此处</p>
                        </Dragger>
                    </div>
                    <div>
                        <span>内容：</span>
                        <TextArea
                            style={{
                                margin: "10px 0"
                            }}
                            placeholder="广告内容"
                            rows={3} value={content} onChange={(e: any) => {
                                setContent(e.target.value)
                            }} />
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
                        <Button onClick={() => setDrawerShow(false)} style={{ marginRight: 8 }}>
                            取消
                            </Button>
                        <Button onClick={() => {
                            // this.setState({ visible: true })
                            // this.submitPetType()
                            // setDrawerShow(false)
                            submitAddAdvertisement(1,advertisementId)
                        }}
                            type="primary">
                            确定
                            </Button>
                    </div>
                </Drawer>
                <Drawer
                    width={500}
                    title="编辑"
                    placement="right"
                    closable={true}
                    onClose={() => {
                        // setDrawerShow(false)
                        clearData()
                    }}
                    visible={drawerEditShow}
                >
                    <RadioGroup onChange={(e: any) => { setAdvertisementType(e.target.value) }} value={advertisementType}>
                        <Radio value={1}>图片链接</Radio>
                        <Radio value={2}>宠物宠物服务</Radio>
                    </RadioGroup>
                    {
                        advertisementType === 1 ?
                            <div style={{ margin: "20px 0" }}>
                                <span>链接：</span>
                                <Input style={{ width: "70%" }} placeholder="请输入链接地址" 
                                value={picUrl}
                                onChange={(e: any) => setPicUrl(e.target.value)} />
                            </div> :
                            <div style={{ margin: "20px 0" }}>
                                <RadioGroup onChange={(e: any) => { setAdvertisementRelateType(e.target.value) }} value={advertisementRelateType}>
                                    <Radio value={1}>宠物</Radio>
                                    <Radio value={2}>商品</Radio>
                                    <Radio value={3}>服务</Radio>
                                </RadioGroup>
                            </div>
                    }
                    {
                        advertisementType === 2 ?
                            <div style={{ margin: "20px 0" }}>
                                <span>关联：</span>
                                <Input style={{ width: "70%" }} placeholder="请输入ID" 
                                defaultValue={relateId}
                                onChange={(e: any) => setRelateId(e.target.value)} />
                            </div> :
                            ""
                    }
                    <div style={{ margin: "20px 0" }}>
                        <span>标题：</span>
                        <Input style={{ width: "70%" }} placeholder="请输入分类名" value={title} onChange={(e: any) => setTitle(e.target.value)} />
                    </div>
                    <div className="Box">
                        <span>图片：</span>
                        <Dragger className="Dragger" onChange={handleUpload} beforeUpload={beforeUpload}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-hint">点击或拖拽图片至此处</p>
                        </Dragger>
                    </div>
                    <div>
                        <span>内容：</span>
                        <TextArea
                            style={{
                                margin: "10px 0"
                            }}
                            placeholder="广告内容"
                            rows={3} value={content} onChange={(e: any) => {
                                setContent(e.target.value)
                            }} />
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
                        <Button onClick={() => setDrawerShow(false)} style={{ marginRight: 8 }}>
                            取消
                            </Button>
                        <Button onClick={() => {
                            // this.setState({ visible: true })
                            // this.submitPetType()
                            // setDrawerShow(false)
                            submitAddAdvertisement(2,advertisementId)
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
