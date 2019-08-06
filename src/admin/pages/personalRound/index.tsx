import * as React from 'react';
import { useEffect, useState } from 'react'
import { apiGetPersonalRoundList } from '../api';
import { Breadcrumb, Table, Modal, Typography, Drawer, Tag } from 'antd'
import moment from 'moment'

const { Paragraph } = Typography;

export const PersonalRound = (props: any) => {

    const [tableData, setTableData] = useState([])

    const [total, setTotal] = useState(0)

    const [page] = useState(0)

    const [drawerShow, setDrawerShow] = useState(false)

    const [showImage, setShowImage] = useState(false)

    const [imageUrlList, setImageUrlList] = useState([])

    const [imageSrc, setImageSrc] = useState("")

    const getPersonalRoundList = (Page: number, size: number) => {
        apiGetPersonalRoundList(0, Page, 10).then((res: any) => {
            if (res && res.data.length > 0) {
                const Data = res.data.map((item: any, index: number) => {
                    return {
                        key: item.id,  // key 应带对应data id 
                        description: item.description ? item.description : "----",
                        image: item.image,
                        userId: item.userId,
                        commentStatus: item.commentStatus,
                        praiseCount: item.praiseCount ? item.praiseCount : 0,
                        viewCount: item.viewCount ? item.viewCount : 0,
                        shareCount: item.shareCount ? item.shareCount : 0,
                        createTime: item.ct ? item.ct : "----"
                    }
                })
                setTableData(Data)
                setTotal(res.total)
            }
        })
    }

    const handleChange = (pagination: any, filters: any, sorter: any) => {
        console.log('Various parameters', pagination, filters, sorter);
        props.history.push(`/home/round/${pagination.current}`)
        getPersonalRoundList(pagination.current, 10)
    }

    useEffect(() => {
        const Page = props.match.params.page
        getPersonalRoundList(Page, 10)
    }, []);


    const columns = [
        {
            title: '用户',
            dataIndex: 'userId',
            key: 'userId',
        }, {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            render: (text: any, record: any) => {
                return (
                    <div onClick={() => {
                        Modal.success({
                            title: "描述",
                            content: record.description,
                            okText: "确定"
                        })
                    }} style={{ cursor: "pointer" }}>
                        <Paragraph ellipsis={true} style={{ width: 100 }}>
                            {
                                record.description
                            }
                        </Paragraph>
                    </div>

                )
            }
        }, {
            title: '图片',
            dataIndex: 'image',
            key: 'image',
            render: (text: any, record: any) => {
                
                const images = record.image ? record.image.split(',') : []
                
                if (!record.image) {
                    return "----"
                } else {
                    return (
                        <a href="javascript:void(0);" onClick={() => {
                            setDrawerShow(true)
                            setImageUrlList(images)

                        }}>点击查看</a>
                    )
                }


            }
        }, {
            title: '评论状态',
            dataIndex: 'commentStatus',
            key: 'commentStatus',
            render: (text: any, record: any) => {
                return (
                    <Tag
                        color={record.commentStatus === 0 ? "#87d068" : "#f50"}
                    >{record.commentStatus === 0 ? "允许" : "禁止"}</Tag>
                )
            }
        }, {
            title: '点赞数',
            dataIndex: 'praiseCount',
            key: 'praiseCount',
        }, {
            title: '浏览数',
            dataIndex: 'viewCount',
            key: 'viewCount',
        }, {
            title: '分享数',
            dataIndex: 'shareCount',
            key: 'shareCount',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text: any, record: any) => {
                return (
                    <span>{moment(parseInt(record.createTime, 10)).format('YYYY-MM-DD H:mm:ss')}</span>
                )
            },
            sorter: (a: any, b: any) => parseInt(a.createTime, 10) - parseInt(b.createTime, 10),
        },]

    const imagesWrap = imageUrlList.map((item: string, index: number) => {
        return (
            <div key={index} style={{
                margin: 10,
            }}>
                <img src={item} style={{ width: 200, border: "3px solid #1890ff" }}
                    onClick={() => {
                        // Modal.success()
                        setImageSrc(item)
                        setShowImage(true)
                    }}
                />
                {
                    index === 0 ? <h2 style={{ textAlign: "center", margin: "10px 0" }}>封面</h2> : ""
                }
            </div>
        )
    })

    return (
        <div>
            <Breadcrumb style={{ textAlign: "left", marginBottom: 25 }}>
                <Breadcrumb.Item>圈子</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">动态列表</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Table columns={columns} dataSource={tableData}
                pagination={{ pageSize: 10, "total": total, defaultCurrent: page }}
                onChange={handleChange}
                locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }} />
            <Drawer
                // width={500}
                // title="添加广告"
                placement="top"
                closable={true}
                onClose={() => {
                    setDrawerShow(false)
                }}
                visible={drawerShow}
                height="auto"
            >
                <div style={{
                    display: "flex",
                    flexWrap: "wrap"
                }}>
                    {imagesWrap}
                </div>
            </Drawer>
            <Modal
                visible={showImage}
                onCancel={() => setShowImage(false)}
                footer={null}
            >
                <img style={{ width: "100%" }} src={imageSrc} alt="" />
            </Modal>
        </div >
    )
}
