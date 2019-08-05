import { getUserId } from './../util/index';
import * as express from 'express'
import { prisma } from '../generated/prisma-client';


const router = express.Router()

router.post(`/list`, async (req, res) => {

    const { page, size, }: { page: string, size: string, } = req.body

    const Page = parseInt(page)

    const Size = parseInt(size)

    const result = await prisma.chongduAdvertisements({
        skip: (Page - 1) * Size,
        first: Size,
        orderBy: "ct_DESC",
    })

    const total = await prisma.chongduAdvertisementsConnection().aggregate().count()

    return res.json({
        data: result,
        total: total
    })

})


router.post(`/add`, async (req, res) => {

    const { type, relateType, relateId, url, title, content, image, cityCode, } = req.body

    const { adminUserId } = await getUserId(req.headers['authorization'])


    let result;

    if (type === 1) {
        result = await prisma.createChongduAdvertisement({
            type: type,
            url: url,
            title: title,
            content: content,
            cityCode: cityCode,
            image: image,
            adminId: adminUserId,
            ct: new Date().getTime().toString(),
            mt: new Date().getTime().toString(),
        })
    } else if(type === 2){

        if (relateType === 1) {
            const ifPetExit = await prisma.chongduPet({
                id: relateId
            })

            if (!ifPetExit) {
                return res.json({
                    success: false,
                    msg: "宠物没有此ID"
                })
            }

        } else if (relateType === 2) {

            const ifProductExit = await prisma.chongduProduct({
                id: relateId
            })

            if (!ifProductExit) {
                return res.json({
                    success: false,
                    msg: "商品没有此ID"
                })
            }

        } else if (relateType === 3) {
            const ifServiceExit = await prisma.chongduService({
                id: relateId
            })

            if (!ifServiceExit) {
                return res.json({
                    success: false,
                    msg: "服务没有此ID"
                })
            }
        } else {
            return res.json({
                success: false,
                msg: "没有此类型"
            })
        }

        result = await prisma.createChongduAdvertisement({
            type: type,
            relateType: relateType,
            relateId: relateId,
            title: title,
            content: content,
            cityCode: cityCode,
            image: image,
            adminId: adminUserId,
            ct: new Date().getTime().toString(),
            mt: new Date().getTime().toString(),
        })
    }else{
        result = await prisma.createChongduAdvertisement({
            type: type,
            image: image,
            relateType: relateType,
            adminId: adminUserId,
            ct: new Date().getTime().toString(),
            mt: new Date().getTime().toString(),
        })
    }

    return res.json({
        success: result ? true : false,
        msg: result ? "添加成功" : "添加失败"
    })

})

router.post(`/edit`, async (req, res) => {

    const { id, type, relateType, relateId, url, title, content, image, cityCode, } = req.body

    const { adminUserId } = await getUserId(req.headers['authorization'])


    let result;

    if (type === 1) {
        result = await prisma.updateChongduAdvertisement({
            where: {
                id: id
            },
            data: {
                type: type,
                url: url,
                title: title,
                content: content,
                cityCode: cityCode,
                image: image,
                adminId: adminUserId,
                mt: new Date().getTime().toString(),
            }
        })
    } else {

        if (relateType === 1) {
            const ifPetExit = await prisma.chongduPet({
                id: relateId
            })

            if (!ifPetExit) {
                return res.json({
                    success: false,
                    msg: "宠物没有此ID"
                })
            }

        } else if (relateType === 2) {

            const ifProductExit = await prisma.chongduProduct({
                id: relateId
            })

            if (!ifProductExit) {
                return res.json({
                    success: false,
                    msg: "商品没有此ID"
                })
            }

        } else if (relateType === 3) {
            const ifServiceExit = await prisma.chongduService({
                id: relateId
            })

            if (!ifServiceExit) {
                return res.json({
                    success: false,
                    msg: "服务没有此ID"
                })
            }
        } else {
            return res.json({
                success: false,
                msg: "没有此类型"
            })
        }

        result = await prisma.updateChongduAdvertisement({
            where: {
                id: id
            },
            data: {
                type: type,
                url: url,
                title: title,
                content: content,
                cityCode: cityCode,
                image: image,
                adminId: adminUserId,
                mt: new Date().getTime().toString(),
            }
        })
    }

    return res.json({
        success: result ? true : false,
        msg: result ? "编辑成功" : "编辑失败"
    })

})

router.post('/delete', async (req, res) => {

    const { ids } = req.body

    const result = await prisma.deleteManyChongduAdvertisements({
        id_in: ids
    })

    return res.json(result)

})

module.exports = router