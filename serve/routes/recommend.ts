import * as express from 'express'
import { prisma } from '../generated/prisma-client';
import { getUserId } from '../util';

const router = express.Router()

router.post(`/list`, async (req, res) => {

    const { page, size, }: { page: string, size: string, } = req.body

    const Page = parseInt(page)

    const Size = parseInt(size)

    const result = await prisma.chongduRecommends({
        skip: (Page - 1) * Size,
        first: Size,
        orderBy: "ct_DESC",
    }).$fragment(`
        fragment recommend on ChongduRecommend {
            id
            type
            relateType
            relateId
            name
            startTime
            endTime
            deviceType
            deviceName
            deviceId
            cityCode
            userId {
                id
                username
                nickname
            }
            cuserId {
                id
                name
            }
            muserId {
                id
                name
            }
            ct
            mt
        } 
    `)

    const total = await prisma.chongduRecommendsConnection().aggregate().count()

    return res.json({
        data: result,
        total: total
    })

})

router.post(`/add`,async(req,res)=>{
    
    const { type, relateType, relateId,name,startTime,endTime, cityCode, deviceType,deviceName,deviceId,userId } = req.body

    const { adminUserId } = await getUserId(req.headers['authorization'])

    const result = await prisma.createChongduRecommend({
        type:type,
        relateType:relateType,
        relateId:relateId,
        name:name,
        startTime:startTime,
        endTime:endTime,
        cityCode:cityCode,
        deviceType:deviceType,
        deviceName:deviceName,
        deviceId:deviceId,
        userId:{
            connect:{
                id:userId
            }
        },
        cuserId:{
            connect:{
                id:adminUserId
            }
        },
        muserId:{
            connect:{
                id:adminUserId
            }
        },
        ct: new Date().getTime().toString(),
        mt: new Date().getTime().toString(),
    })

    return res.json({
        data:result,
        success: result ? true:false,
        msg:result ? "添加成功":"添加失败",
    })
})

router.post('/delete',async(req,res)=>{
    const {ids} = req.body

    const result = await prisma.deleteManyChongduRecommends({
        id_in:ids
    })

    return res.json(result)
})

router.post('/edit',async(req,res)=>{

    const { id , type, relateType, relateId,name,startTime,endTime, cityCode, deviceType,deviceName,deviceId,userId } = req.body

    const { adminUserId } = await getUserId(req.headers['authorization'])

    const result = await prisma.updateChongduRecommend({
        where:{
            id:id
        },
        data:{
            type:type,
            relateType:relateType,
            relateId:relateId,
            name:name,
            startTime:startTime,
            endTime:endTime,
            cityCode:cityCode,
            deviceType:deviceType,
            deviceName:deviceName,
            deviceId:deviceId,
            userId:{
                connect:{
                    id:userId
                }
            },
            cuserId:{
                connect:{
                    id:adminUserId
                }
            },
            muserId:{
                connect:{
                    id:adminUserId
                }
            },
            mt: new Date().getTime().toString(),
        }
    })

    return res.json({
        data:result,
        success: result ? true:false,
        msg:result ? "编辑成功":"编辑失败",
    })

})

router.post('/relateTypeList',async(req,res)=>{

    const {type,userId} = req.body

    let result

    if(type ===1){
        result = await prisma.chongduPets({
            where:{
                userId:{
                    id:userId
                }
            }
        })
    }else if(type === 2){
        result = await prisma.chongduProducts({
            where:{
                userId:userId
            }
        })
    }else if(type===3){
        result = await prisma.chongduServices({
            where:{
                userId:{
                    id:userId
                }
            }
        })
    }
    
    return res.json({
        data:result,
        success: result ? true:false,
    })
})

module.exports = router