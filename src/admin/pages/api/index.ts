import axios from "../../util/Axios";

/**
 * 
 * @param page 默认page=1
 * @description 获取宠物审核列表
 */
export const apiGetPetAuditList = async (page:number,size:number,status:string[])=>{
    return await axios({
        method:"post",
        url: `/audit/petList`,
        data:{
            "page":page,
            "size":size,
            "status":status
        }
    })
}

/**
 * 
 * @param page 默认page=1
 * @param size 默认size=10
 * @param status string[] 0待审核 1审核通过 2审核驳回
 * @description 获取商品审核列表
 */
export const apiGetProductList = (page:number,size:number,status:string[])=>{
    return axios({
        method:"post",
        url: `/audit/productList`,
        data:{
            "page":page,
            "size":size,
            "status":status
        }
    })
}

/**
 * 
 * @param page 默认page=1
 * @param size 默认size=10
 * @param status string[] 0待审核 1审核通过 2审核驳回
 * @description 获取服务审核列表
 */
export const apiGetServiceAuditList = (page:number,size:number,status:string[])=>{
    return axios({
        method:"post",
        url: `/audit/serviceList`,
        data:{
            "page":page,
            "size":size,
            "status":status
        }
    })
}

/**
 * 
 * @param page 默认page=1
 * @param size 默认size=10
 * @param status string[] 0待审核 1审核通过 2审核驳回
 * @description 获取用户审核列表
 */
export const apiGetUserAuditList = (page:number,size:number,status:string[])=>{
    return axios({
        method:"post",
        url: `/audit/userList`,
        data:{
            "page":page,
            "size":size,
            "status":status
        }
    })
}

/**
 * 
 * @param page 默认page=1
 * @param size 默认size=10
 * @param status string[] 0待审核 1审核通过 2审核驳回
 * @description 获取企业审核列表
 */
export const apiGetCompanyAuditList = (page:number,size:number,status:string[])=>{
    return axios({
        method:"post",
        url: `/audit/companyList`,
        data:{
            "page":page,
            "size":size,
            "status":status
        }
    })
}

/**
 * 
 * @param page 默认page=1
 * @param size 默认size=10
 * @param status string[] 0待审核 1审核通过 2审核驳回
 * @description 获取用户列表
 */
export const apiGetUserList = (page:number,size:number)=>{
    return axios({
        method:"post",
        url: `/user/list`,
        data:{
            "page":page,
            "size":size,
        }
    })
}

/**
 * 获取商圈列表
 */
export const apiGetBusinessRound = ()=>{
    return axios({
        method:"get",
        url:`/round/list`
    })
}
/**
 * 发布商圈
 * @param BusinessArea 商圈地区  目前只有扬州
 * @param BusinessRound 商圈名
 */
export const apiPublishBusinessArea = (BusinessArea:string[],BusinessRound:string)=>{
    return axios({
        method:"post",
        url:`/round/add`,
        data:{
            area:BusinessArea[BusinessArea.length - 1],
            round:BusinessRound
        }
    })
}

/**
 * 图片总管理
 * @param BusinessArea 商圈地区  目前只有扬州
 * @param BusinessRound 商圈名
 */
export const apiGetPictureList = (current:number,limit:number)=>{
    return axios({
        method:"get",
        url:`/picture/list?current=${current}&limit=${limit}`,
    })
}

/**
 * 广告列表
 * @param page 页码
 * @param size 每页个数
 */
export const apiGetAdvertisementList = (page:number,size:number)=>{
    return axios({
        method:"post",
        url: `/advertisement/list`,
        data:{
            "page":page,
            "size":size,
        }
    })
}

/**
 * 添加广告
 * @param page 页码
 * @param size 每页个数
 */
export const apiPostAdvertisement = (
        type:number,
        relateType:number,
        relateId:string,
        url:string,
        title:string,
        content:string,
        image:string,
        cityCode:string
    )=>{
    return axios({
        method:"post",
        url: `/advertisement/add`,
        data:{
            "type":type,
            "relateType":relateType,
            "relateId":relateId,
            "url":url,
            "title":title,
            "content":content,
            "image":image,
            "cityCode":cityCode
        }
    })
}

/**
 * 添加广告
 * @param page 页码
 * @param size 每页个数
 */
export const apiEditAdvertisement = (
    id:number,
    type:number,
    relateType:number,
    relateId:string,
    url:string,
    title:string,
    content:string,
    image:string,
    cityCode:string
)=>{
return axios({
    method:"post",
    url: `/advertisement/edit`,
    data:{
        "id":id,
        "type":type,
        "relateType":relateType,
        "relateId":relateId,
        "url":url,
        "title":title,
        "content":content,
        "image":image,
        "cityCode":cityCode
    }
})
}

/**
 * 删除广告
 * @param ids id集合 
 */
export const apiDeleteAdvertisement = (ids:string[])=>{
    return axios({
        method:"post",
        url: `/advertisement/delete`,
        data:{
            "ids":ids
        }
    })
}

/**
 * 
 * @param type 0动态 1活动
 */
export const apiGetPersonalRoundList = (type:number ,page:number,size:number)=>{
    return axios({
        method:"post",
        url:`/personalRound/list`,
        data:{
            "type":type,
            "page":page,
            "size":size
        }
    })
}