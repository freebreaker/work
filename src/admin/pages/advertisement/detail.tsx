import * as React from 'react';
import { useEffect, useState} from 'react'
import { Modal } from 'antd';
import axios from '../../util/Axios';
import { PetDetail } from './petDetail';
import { ProductDetail } from './productDetail';
import { ServiceDetail } from './serviceDetail';

interface IAdvertisementDetailProps {
    show: boolean
    relateType: number
    relateId: string
    hide: () => void
}

const urlList = ["pet", "product", "service"]

export const AdvertisementDetail = (props: IAdvertisementDetailProps) => {

    const  [visible,setVisible] = useState(false)

    const [petData,setPetData] = useState({
        id: "",
        name: "",
        title: "title",
        petKind: "",
        sex: 0,
        color: "",
        birthday: "",
        price: "",
        imgUrlPapers: "",
        content: "",
        contact: "",
        phone: "",
        publishArea: "",
        streetArea: "",
        imgMsgs: [],
        vacMsgs: [],
        repMsgs: [],
    })

    const [productData,setProductData] = useState({
        productData: {
            "productKind": "",
            "productname": "",
            title: "",
            price: 0,
            images: [],
            introduction: "",
          },
          brandData: {
            name:"",
            logoImg:""
          },
          merchantData:{
            merchantName:"",
            merchantAddress:"",
            merchantTel:"",
            merchantIcon:"",
            merchantCity:``,
            merchantBeginTime:``,
            merchantEndTime:``,
          },
          stockData:{
            stockAttribute:"",
            stockPrice:``,
            stockNum:0,
            stockSalesVolume:0
          },
    })

    const [serviceData, setServiceData] = useState({
        id: "",
        name: "",
        title: "",
        serviceKind: "",
        price:0,
        icon:"",
        content: "",
        contact: "",
        phone: "",
        streetArea: "",  
    })

    useEffect(() => {
        const url = urlList[props.relateType - 1]
        const id = props.relateId
        axios({
            method: "get",
            url: `/detail/${url}?id=${id}`
        }).then((res: any) => {
            if (res) {
                setVisible(true)
                if(props.relateType ===1){
                    setPetData({
                        id: res.id,
                        name: res.name,
                        title: res.title,
                        "petKind": "",
                        sex: res.sex ? res.sex : 0,
                        color: res.color ? res.color : "未知",
                        birthday: res.brithday ? res.brithday : "未知",
                        price: res.price ? res.price : "面议",
                        imgUrlPapers: "",
                        content: res.content ? res.content : "内容详情",
                        contact: res.userId ? res.userId.username : "----",
                        phone: res.userId ? res.userId.phone : "----",
                        publishArea: res.citycode ? res.citycode : "暂无",
                        streetArea: res.addressId ? res.addressId : "暂无",
                        imgMsgs: res.imgMsgs ? res.imgMsgs : [],
                        vacMsgs: res.vacMsgs ? res.vacMsgs : [],
                        repMsgs: res.repMsgs ? res.repMsgs : [],
                      })
                }else if(props.relateType===2){
                    setProductData({
                        productData: {
                            "productKind": res.typeId?res.typeId.name:"----",
                            "productname": res.name?res.name:"----",
                            price: res.price?res.price:0,
                            title: res.title?res.title:"----",
                            images: res.imgMsgs ? res.imgMsgs : [],
                            introduction: res.content ? res.content : "----",
                          },
                        brandData: {
                            name: res.brandId.name,
                            logoImg: res.brandId.logoImg
                          },
                          merchantData:{
                            merchantName:res.merchantId.name,
                            merchantAddress:res.merchantId.address,
                            merchantTel:res.merchantId.tel,
                            merchantIcon:res.merchantId.icon,
                            merchantCity:res.merchantId.city,
                            merchantBeginTime:res.merchantId.beginTime,
                            merchantEndTime:res.merchantId.endTime,
                          },
                          stockData:{
                            stockAttribute:res.stockId.attribute,
                            stockPrice:res.stockId.price,
                            stockNum:res.stockId.num,
                            stockSalesVolume:res.stockId.salesVolume,
                          },
                    })
                }else{
                    setServiceData({
                        id: res.id,
                        name: res.name?res.name:"----",
                        title: res.title?res.title:"----",
                        "serviceKind": res.typeId?res.typeId.name:"----",
                        price: res.price ? res.price : "面议",
                        content: res.content ? res.content : "----",
                        contact: res.userId ? res.userId.username : "----",
                        phone: res.userId ? res.userId.phone : "----",
                        streetArea: res.area ? res.area : "暂无",
                        icon:res.icon?res.icon:"----"
                    })
                }
            }
        })
    }, [props.relateId])


    let Content;

    if(props.relateType === 1){
        Content =(<PetDetail data={petData}/>)
    }else if(props.relateType === 2){
        Content =(<ProductDetail 
            data={productData.productData} 
            brandData={productData.brandData}
            stockData={productData.stockData}
            merchantData={productData.merchantData}
        />)
    }else{
        Content=(<ServiceDetail data={serviceData}/>)
    }

    return (
        <Modal width={820} visible={visible} className="CompanyAuditMsgModal"
            onCancel={()=>{
                props.hide()
                setVisible(false)
            }}
            onOk={()=>{
                props.hide()
                setVisible(false)
            }}
            cancelText="取消"
            okText="确定"
        >
            {Content}
        </Modal>
    )
}
