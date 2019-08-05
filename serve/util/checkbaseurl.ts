
export const checkBaseUrl = (baseUrl:String,menus:any[])=>{

    const baseUrlAuth = menus.filter((item)=>{
        return item.menuUrl === baseUrl
    })

    return baseUrlAuth.length>0

}
