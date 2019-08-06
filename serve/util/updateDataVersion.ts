import { getUserId } from './index';

import * as moment from 'moment'
import getClientIp from './getIp';


interface dataVersion {
    type:Number,
    name:string,
    versionCode:string,
}

/**
 * 
 * @param func 创建函数
 * @param data 数据
 */
export const createDataVersion = async (func:any,data:dataVersion,req:any) =>{

    const muserId = await getUserId(req.headers['authorization'])

    await func({
        type:data.type,
        name:data.name,
        versionCode:data.versionCode + moment(parseInt(new Date().getTime().toString(),10)).format('YYYY-MM-DD H:mm:ss'),
        muserId:muserId.adminUserId,
        mt:new Date().getTime().toString(),
        mac:"",
        ip:getClientIp(req)
    })
    
    return
}