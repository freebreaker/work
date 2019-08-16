import * as express from 'express'
import { prisma } from '../generated/prisma-client';
import { getUserId } from '../util';

const router = express.Router()

router.get(`/list`, async (req, res) => {

    const result = await prisma.newses({
        orderBy:"createdAt_DESC"
    }).$fragment(`
    fragment News on news {
        id
        title
        content
        cuser {
            id
            name
        }
        createdAt
    }
`)

    return res.json(result)

})

router.post('/add' , async (req,res)=>{

    const {title , content} = req.body

    const userMsgs = await getUserId(req.headers['authorization'])

    const result = await prisma.createNews({
        title:title,
        content:content,
        cuser:{
            connect:{
                id:userMsgs.adminUserId
            }
        }
    })

    return res.json(result)

})


router.post('/edit' , async (req,res)=>{

    const {id , title ,content} = req.body

    const result = await prisma.updateNews({
        where:{
            id:id
        },
        data:{
            title:title,
            content:content
        }
    })

    return res.json(result)

})


router.post('/delete' , async (req , res)=>{
    
    const { ids } = req.body

    const result = await prisma.deleteManyNewses({
        id_in:ids
    })

    return res.json(result)

})

module.exports = router