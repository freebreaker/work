import axios from "../../util/Axios";

/**
 * 
 * @param page 默认page=1
 * @description 获取宠物审核列表
 */
export const apiGetPictureList = async ()=>{
    return await axios({
        method:"post",
        url: `/pics/list`,
    })
}


export const apiPostPicture =async (formData:FormData)=>{
    return await axios({
        method:"post",
        url: `/pics/add`,
        data:formData,
        headers: { "Content-Type": "multipart/form-data" },
    })
}



export const apiEditPicture =async (formData:FormData)=>{
    return await axios({
        method:"post",
        url: `/pics/edit`,
        data:formData,
        headers: { "Content-Type": "multipart/form-data" },
    })
}


export const apiDeletePicture = (ids:string[])=>{
    return axios({
        method:"post",
        url: `/pics/delete`,
        data:{
            "ids":ids
        },
    })
}

export const apiAddMessage = (message:string,name:string,phone:string)=>{
    return axios({
        method:"post",
        url: `/message/add`,
        data:{
            name:name,
            phone:phone,
            message:message
        },
    })
}



export const apiGetMessageList = (page:number,size:number)=>{
    return axios({
        method:"post",
        url: `/message/list`,
        data:{
            page:page,
            size:size
        }
    })
}



export const apiDeleteMessage = (ids:string[])=>{
    return axios({
        method:"post",
        url: `/message/delete`,
        data:{
            "ids":ids
        },
    })
}

export const apiDeal = (id:string,deal:Boolean,remark:string)=>{
    return axios({
        method:"post",
        url: `/message/deal`,
        data:{
            id:id,
            "deal":deal,
            remark:remark
        },
    })
}

export const apiAddAdminUsers = (name:string,pwd:string,realName?:string,phone?:string)=>{
    return axios({
        method:"post",
        url: `/adminusers/add`,
        data:{
            name:name,
            pwd:pwd,
            realName:realName,
            phone:phone
        },
    }) 
}

export const apiEditAdminUser = (id:number,name:string,pwd:string,realName?:string,phone?:string)=>{
    return axios({
        method:"post",
        url: `/adminusers/edit`,
        data:{
            id:id,
            name:name,
            pwd:pwd,
            realName:realName,
            phone:phone
        },
    }) 
}


export const apiGetNews = ()=>{
    return axios({
        method:"get",
        url: `/news/list`,
    }) 
}


export const apiAddNews = (title:string,content:string)=>{
    return axios({
        method:"post",
        url: `/news/add`,
        data:{
            title:title,
            content:content
        }
    }) 
}


export const apiEditNews = (id:number,title:string,content:string)=>{
    return axios({
        method:"post",
        url: `/news/edit`,
        data:{
            id:id,
            title:title,
            content:content
        }
    }) 
}