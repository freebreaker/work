import axios from "axios";

/**
 * 
 * @param {*} page number 第几页 
 */
export const getPics= ()=>{
    return axios({
        method:"post",
        url:"/picsList"
    })
}