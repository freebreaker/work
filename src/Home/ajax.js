import axios from "axios";

/**
 * 
 * @param {*} page number 第几页 
 */
export const getBanners = async (page)=>{
    await axios({
        mehhod:"get",
        url:"/"
    })
}