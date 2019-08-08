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
