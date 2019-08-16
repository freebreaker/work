import * as express from 'express'
import { prisma } from '../generated/prisma-client';
import { getUserId } from '../util';

const router = express.Router()

router.post(`/list`, async (req, res) => {

    const result = await prisma.msgs().$fragment(`
        fragment msg on msgs {
            id
            name
            phone
            message
            createdAt
            remarks
            deal
            cuser{
                id
                name
                realName
            }
            dealTime
        }
    `)

    return res.json({
        data: result
    })
})

router.post(`/add`, async (req, res) => {

    const { name, phone, message } = req.body

    const result = await prisma.createMsg({
        name: name,
        phone: phone,
        message: message
    })

    return res.json(result)
})


router.post('/delete', async (req, res) => {

    const { ids } = req.body

    const idsNum = ids.map(Number)

    const result = await prisma.deleteManyMsgs({
        id_in: idsNum
    })

    return res.json(result)

})

router.post('/deal', async (req, res) => {

    const { id, remark, deal } = req.body

    const Authorization = req.headers['authorization']
  
    const { adminUserId  } = await getUserId(Authorization)

    const Id = parseInt(id,10)

    const result = await prisma.updateMsg({
        where: {
            id: Id
        },
        data: {
            remarks: remark,
            deal: deal,
            dealTime:new Date(),
            cuser:{
                connect:{
                    id:adminUserId
                }
            }
        }
    })

    return res.json(result)

})

module.exports = router