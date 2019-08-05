import * as React from 'react';
import { Tabs, Popover, } from 'antd'
import './serviceDetail.less'
const PopImage = (imgSrc: string) => (
    <img src={imgSrc} alt="" style={{ width: 260 }} />
)

const TabPane = Tabs.TabPane;

interface Data {
    id: string,
    name: string,
    title: string,
    serviceKind: string,
    content:string
    price: number,
    contact: string,
    phone: string,
    streetArea: string,
    icon:string
}


interface ServiceDetailProps {
    data: Data
}

export const ServiceDetail = (props: ServiceDetailProps) => {

    const { title, name, serviceKind, price, contact, phone, 
        streetArea, icon} = props.data

    return (
        <div className="ServiceAuditMsgModal">
            <Tabs defaultActiveKey="1" size="large">
                <TabPane tab="服务详情" key="1">
                    <div className="ServiceAuditMsgModalContent">
                        <p>
                            <span>服务名称：</span>
                            <span>{name}</span>
                        </p>
                        <p>
                            <span>服务标题：</span>
                            <span>{title}</span>
                        </p>
                        <p>
                            <span>服务类别：</span>
                            <span>{serviceKind}</span>
                        </p>
                        <p>
                            <span>服务价格：</span>
                            <span>{price}</span>
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
                            <span>服务照片</span>
                            <div className="imgWrap">
                                <div>
                                    <Popover content={PopImage(icon)} placement="right" trigger="hover"
                                        autoAdjustOverflow={false}
                                    >
                                        <img src={icon} alt="" />
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}
