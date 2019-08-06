import * as React from 'react';
import { Tabs, Table, Popover, } from 'antd'
import './petDetail.less'
const PopImage = (imgSrc: string) => (
    <img src={imgSrc} alt="" style={{ width: 260 }} />
)

const TabPane = Tabs.TabPane;

interface Data {
    id: string,
    name: string,
    title: string,
    petKind: string,
    sex: number,
    birthday: string,
    price: string,
    publishArea: string,
    contact: string,
    phone: string,
    streetArea: string,
    imgMsgs: object[],
    vacMsgs: object[],
    repMsgs: object[],
}


interface IPetDetailDetailProps {
    data: Data
}

export const PetDetail = (props: IPetDetailDetailProps) => {
    const { title, name, petKind, sex, birthday, price, publishArea, contact, phone,
        streetArea, imgMsgs, vacMsgs, repMsgs } = props.data

    const imgsWraps = imgMsgs.map((item: any, index: number) => {
        return (
            <div key={index}>
                <Popover content={PopImage(item.addr)} placement="top" trigger="hover"
                    autoAdjustOverflow={false}
                >
                    <img src={item.addr} alt="" />
                </Popover>
            </div>

        )
    })

    const columns = [{
        title: '序号',
        dataIndex: 'order',
        key: 'order',
    }, {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
    }, {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
    }, {
        title: '图片',
        dataIndex: 'images',
        key: 'images',
    }, {
        title: '说明',
        dataIndex: 'introduction',
        key: 'introduction',
    }];


    const vacTableData = vacMsgs.map((item: any, index: number) => {
        return {
            key: index,
            order: 2,
            time: 'time',
            address: "地址",
            images: "dd",
            introduction: "说明"
        }
    })

    const repTableData = repMsgs.map((item: any, index: number) => {
        return {
            key: index,
            order: 3,
            time: 'time',
            address: "地址",
            images: "dd",
            introduction: "说明"
        }
    })

    return (
        <div className="PetAuditMsgModal">
            <Tabs defaultActiveKey="1" size="large">
                <TabPane tab="宠物详情" key="1">
                    <div className="PetAuditMsgModalContent">
                        <p>
                            <span>宠物名称：</span>
                            <span>{name}</span>
                        </p>
                        <p>
                            <span>宠物标题：</span>
                            <span>{title}</span>
                        </p>
                        <p>
                            <span>宠物类别：</span>
                            <span>{petKind}</span>
                        </p>
                        <p>
                            <span>宠物性别：</span>
                            <span>{sex ? "公" : "母"}</span>
                        </p>
                        <p>
                            <span>宠物生日：</span>
                            <span>{birthday}</span>
                        </p>
                        <p>
                            <span>宠物价格：</span>
                            <span>{price}</span>
                        </p>
                        <p>
                            <span>宠物发布区域：</span>
                            <span>{publishArea}</span>
                        </p>

                        <p>
                            <span>联系人：</span>
                            <span>{`${contact}  ${phone}`}</span>
                        </p>
                        <p>
                            <span>街道地址：</span>
                            <span>{streetArea}</span>
                        </p>
                        <div>
                            <span>宠物照片</span>
                            <div className="imgWrap">
                                {imgsWraps}
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="疫苗信息" key="2">
                    <div className="PetAuditMsgModalContent">
                        <Table columns={columns}
                            dataSource={vacTableData}
                            pagination={{ pageSize: 5 }}
                            locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }}
                        />
                    </div>
                </TabPane>
                <TabPane tab="驱虫信息" key="3">
                    <div className="PetAuditMsgModalContent">
                        <Table columns={columns}
                            dataSource={repTableData}
                            pagination={{ pageSize: 5 }}
                            locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }}
                        />
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}
