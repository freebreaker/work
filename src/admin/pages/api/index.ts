import axios from "../../util/Axios";

/**
 * 
 * @param page 默认page=1
 * @description 获取宠物审核列表
 */
export const apiGetPictureList = async () => {
    return await axios({
        method: "get",
        url: `/mango/list`,
    })
}

export const apiGetVideoList = async () => {
    return await axios({
        method: "get",
        url: `/video/list`,
    })
}

export const apiAddVideo = async (formData: FormData) => {
    return await axios({
        method: "post",
        url: `/video/add`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    })
}

export const apiEditVideo = async (formData: FormData) => {
    return await axios({
        method: "post",
        url: `/video/edit`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    })
}

export const apiPostPicture = async (formData: FormData) => {
    return await axios({
        method: "post",
        url: `/mango/addPic`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    })
}



export const apiEditPicture = async (formData: FormData) => {
    return await axios({
        method: "post",
        url: `/mango/editPic`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    })
}


export const apiDeletePicture = (ids: string[]) => {
    return axios({
        method: "post",
        url: `/pics/delete`,
        data: {
            "ids": ids
        },
    })
}

export const apiAddMessage = (message: string, name: string, phone: string) => {
    return axios({
        method: "post",
        url: `/message/add`,
        data: {
            name: name,
            phone: phone,
            message: message
        },
    })
}



export const apiGetMessageList = (page: number, size: number) => {
    return axios({
        method: "post",
        url: `/message/list`,
        data: {
            page: page,
            size: size
        }
    })
}



export const apiDeleteMessage = (ids: string[]) => {
    return axios({
        method: "post",
        url: `/message/delete`,
        data: {
            "ids": ids
        },
    })
}

export const apiDeal = (id: string, deal: Boolean, remark: string) => {
    return axios({
        method: "post",
        url: `/message/deal`,
        data: {
            id: id,
            "deal": deal,
            remark: remark
        },
    })
}

export const apiAddAdminUsers = (name: string, pwd: string, phone: string) => {
    return axios({
        method: "post",
        url: `/admin/add`,
        data: {
            name: name,
            pwd: pwd,
            phone: phone
        },
    })
}

export const apiEditAdminUser = (id: number, name: string, pwd: string, phone?: string) => {
    return axios({
        method: "post",
        url: `/admin/edit`,
        data: {
            id: id,
            name: name,
            pwd: pwd,
            phone: phone
        },
    })
}

export const apiDeleteAdminUser = (ids: number[]) => {
    return axios({
        method: "post",
        url: `/admin/delete`,
        data: {
            id: ids,
        },
    })
}