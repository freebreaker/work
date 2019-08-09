import * as express from 'express'
import { prisma } from '../generated/prisma-client';
import * as multer from 'multer'
import * as path from 'path';
import * as fs from 'fs'
const router = express.Router()

const upload = multer({ dest: path.join(__dirname, '../build/app/') });


router.post(`/list`, async (req, res) => {

    const { type } = req.body

    const result = await prisma.picses()

    return res.json(result)
})

router.post(`/add`, upload.array('files'), async (req, res) => {

    const { type, page, title, content } = req.body

    if (req.files instanceof Array) {
        for (let i = 0; i < req.files.length; i++) {
            await prisma.createPics({
                type: parseInt(type,10),
                page: parseInt(page,10),
                title: title,
                text: content,
            })
        }
    }

    return res.json({
        success: true
    })
})

module.exports = router