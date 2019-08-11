import * as express from 'express'
import { prisma } from '../generated/prisma-client';
import * as multer from 'multer'
import * as path from 'path';
import * as fs from 'fs'
import { getUserId } from '../util';
const router = express.Router()

const upload = multer({ dest: path.join(__dirname, '../build/app/') });


router.post(`/list`, async (req, res) => {

    const { type } = req.body

    const result = await prisma.picses().$fragment(`
        fragment pic on pics{
            createdAt
            id
            imgSrc
            lastModifiedAt
            page
            text
            title
            type
            cuser {
                id
                name
                realName
            }
        }
    `)

    return res.json(result)
})

router.post(`/add`, upload.array('files'), async (req, res) => {

    const { type, page, title, content } = req.body

    const Type = parseInt(type, 10)

    const Page = parseInt(page, 10)

    const PageNameList = ["page1", "page2",]

    const TypeNameList = ["top", "middle", "bottom"]

    const userMsgs = await getUserId(req.headers['authorization'])

    if (req.files instanceof Array) {

        for (let i = 0; i < req.files.length; i++) {

            const Time = new Date().getTime()

            const ext = req.files[i].originalname.split('.')[1];

            const temp_path = req.files[i].path;

            const target_path = req.files[i].destination + `${PageNameList[Page - 1]}_${TypeNameList[Type - 1]}_${Time}_${i}.${ext}`

            console.log(target_path)

            fs.rename(temp_path, target_path, async (error: any) => {
                if (!error) {
                    console.log('上传成功')
                    await prisma.createPics({
                        type: Type,
                        page: Page,
                        title: title,
                        text: content,
                        cuser:{
                            connect:{
                                id:userMsgs.adminUserId
                            }
                        },
                        imgSrc: `${PageNameList[Page - 1]}_${TypeNameList[Type - 1]}_${Time}_${i}.${ext}`
                    })
                }
            });
        }
    }

    return res.json({
        success: true
    })
})

router.post(`/edit`, upload.single('files'), async (req, res) => {

    const { editId, type, page, title, content, imgSrc } = req.body

    const Type = parseInt(type, 10)

    const Page = parseInt(page, 10)

    const Id = parseInt(editId, 10)

    const userMsgs = await getUserId(req.headers['authorization'])

    await prisma.updatePics({
        where: {
            id: Id
        },
        data: {
            type: Type,
            page: Page,
            title: title,
            text: content,
            cuser:{
                connect:{
                    id:userMsgs.adminUserId
                }
            }
        }
    })

    if (req.file) {

        const temp_path = req.file.path;

        const target_path = req.file.destination + imgSrc

        fs.rename(temp_path, target_path, async (error: any) => {
            if (!error) {
            }
        });
    }

    return res.json({
        success: true
    })

})

router.post('/delete', async (req, res) => {

    const { ids } = req.body

    const idsNum = ids.map(Number)

    const result = await prisma.deleteManyPicses({
        id_in: idsNum
    })

    return res.json(result)

})

module.exports = router