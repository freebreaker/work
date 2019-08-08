import * as express from 'express'
import { prisma } from '../generated/prisma-client';

const router = express.Router()

router.post(`/list`, async (req, res) => {

    const { type } = req.body

    const result = await prisma.picses()

    return res.json(result)
})

router.post(`/add`, async (req, res) => {

    const { type, page ,title,content,} = req.body

    const result = await prisma.createPics({
        type: type,
        page: page
    })

    return res.json(result)
})

module.exports = router