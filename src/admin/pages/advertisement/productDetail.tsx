import * as React from 'react';
import { Tabs, Popover, } from 'antd'
import './productDetail.less'
const PopImage = (imgSrc: string) => (
    <img src={imgSrc} alt="" style={{ width: 260 }} />
)

const TabPane = Tabs.TabPane;

interface Data {
    productKind: string,
    productname: string,
    title: string,
    price: number,
    images: string[],
    introduction: string,
}

interface BrandData {
    name: string
    logoImg: string
}

interface MerchantData {
    merchantName: string
    merchantAddress: string
    merchantTel: string
    merchantIcon: string
    merchantCity: string
    merchantBeginTime: string
    merchantEndTime: string
}

interface StockData {
    stockAttribute: string
    stockPrice: string
    stockNum: number
    stockSalesVolume: number
}


interface ProductAuditMsgModalProps {
    data: Data
    brandData: BrandData
    merchantData: MerchantData
    stockData: StockData
}

export const ProductDetail = (props: ProductAuditMsgModalProps) => {

    const { images, productKind, productname, title, price, introduction } = props.data

    const { name, logoImg } = props.brandData

    const { merchantName, merchantAddress
        , merchantBeginTime, merchantEndTime
        , merchantCity, merchantTel, merchantIcon } = props.merchantData

    const { stockAttribute, stockPrice, stockNum, stockSalesVolume } = props.stockData

    const imgsWraps = images.map((item: any, index: number) => {
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

    return (
        <div className="ProductAuditMsgModal">
                    <Tabs defaultActiveKey="1" size="large">
                        <TabPane tab="商品详情" key="1">
                            <div className="ProductAuditMsgModalContent">
                                <p>
                                    <span>商品名称：</span>
                                    <span>{productname}</span>
                                </p>
                                <p>
                                    <span>商品标题：</span>
                                    <span>{title}</span>
                                </p>
                                <p>
                                    <span>商品类别：</span>
                                    <span>{productKind}</span>
                                </p>
                                <p>
                                    <span>商品价格：</span>
                                    <span>{price}</span>
                                </p>
                                <p>
                                    <span>商品重量：</span>
                                    <span>100</span>
                                </p>
                                <p>
                                    <span>商品描述：</span>
                                    <span>{introduction}</span>
                                </p>
                                <p>
                                    <span>发布区域：</span>
                                    <span>100</span>
                                </p>
                                <p>
                                    <span>联系人：</span>
                                    <span>100</span>
                                </p>
                                <div>
                                    <span>商品头部照片</span>
                                    <div className="imgWrap">
                                        {imgsWraps}
                                    </div>
                                    <span>商品照片</span>
                                    <div className="imgWrap">
                                        {imgsWraps}
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="商品品牌" key="2">
                            <div className="ProductAuditMsgModalContent">
                                <p>
                                    <span>品牌名：</span>
                                    <span>{name}</span>
                                </p>
                                <div style={{ width: "100%" }}>
                                    <span>品牌logo:</span>
                                    <div className="">
                                        <Popover content={PopImage(logoImg)} placement="right" trigger="hover"
                                            autoAdjustOverflow={false}
                                        >
                                            <img src={logoImg} alt="" style={{ width: 80, marginTop: 20 }} />
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="店铺信息" key="3">
                            <div className="ProductAuditMsgModalContent">
                                <p>
                                    <span>店铺名：</span>
                                    <span>{merchantName}</span>
                                </p>
                                <p>
                                    <span>店铺地址：</span>
                                    <span>{merchantCity}  {merchantAddress}</span>
                                </p>
                                <p>
                                    <span>店铺电话：</span>
                                    <span>{merchantTel}</span>
                                </p>
                                <p>
                                    <span>店铺icon：</span>
                                    <span>{merchantIcon}</span>
                                </p>
                                <p>
                                    <span>营业时间：</span>
                                    <span>{merchantBeginTime}至{merchantEndTime}</span>
                                </p>
                                <div style={{ width: "100%" }}>
                                    <span>品牌logo:</span>
                                    <div className="">
                                        <Popover content={PopImage(logoImg)} placement="right" trigger="hover"
                                            autoAdjustOverflow={false}
                                        >
                                            <img src={logoImg} alt="" style={{ width: 80, marginTop: 20 }} />
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="库存信息" key="4">
                            <div className="ProductAuditMsgModalContent">
                                <p>
                                    <span>库存属性：</span>
                                    <span>{stockAttribute}</span>
                                </p>
                                <p>
                                    <span>库存量：</span>
                                    <span>{stockNum}</span>
                                </p>
                                <p>
                                    <span>库存销量：</span>
                                    <span>{stockSalesVolume}</span>
                                </p>
                                <p>
                                    <span>价格：</span>
                                    <span>{stockPrice}</span>
                                </p>
                            </div>
                        </TabPane>
                    </Tabs>
        </div>
    )
}
