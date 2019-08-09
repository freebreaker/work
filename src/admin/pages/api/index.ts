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

// export const apiPostPicture =async (page:number,type:number,imgSrc:any[],title?:string,content?:string)=>{
//     return await axios({
//         method:"post",
//         url: `/pics/add`,
//         data:{
//             "type": type,
//             "page": page,
//             "title":title,
//             "text":content,
//             "imgSrc":imgSrc
//         }
//     })
// }

export const apiPostPicture =async (formData:FormData)=>{
    return await axios({
        method:"post",
        url: `/pics/add`,
        data:formData,
        headers: { "Content-Type": "multipart/form-data" },
    })
}