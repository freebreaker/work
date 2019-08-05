import { getUserId } from './../util/index';
import * as express from 'express'
import { prisma } from '../generated/prisma-client';


const router = express.Router()

router.post(`/list`, async (req, res) => {

    const { page, size } = req.body

    const Page = parseInt(page)

    const Size = parseInt(size)

    const result = await prisma.chongduUsers({
        skip: (Page - 1) * Size,
        first: Size,
        orderBy: "ct_DESC",
    })

    const total = await prisma.chongduUsersConnection({}).aggregate().count()

    return res.json({
        data: result,
        total: total
    })

})

router.post(`/search`, async (req, res) => {

    const { keyword } = req.body

    const result = await prisma.chongduUsers({
        where: {
            OR: [
                { nickname_contains: keyword },
                { username_contains: keyword },
            ],
        },
    })

    const total = await prisma.chongduUsersConnection({}).aggregate().count()

    return res.json({
        data: result,
        total: total
    })

})


module.exports = router