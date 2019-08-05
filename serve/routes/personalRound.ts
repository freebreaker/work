import * as express from 'express'
import { prisma } from '../generated/prisma-client';


const router = express.Router()

router.post(`/list`, async (req, res) => {

    const { type ,page, size, }: { type:number ,page: string, size: string, } = req.body

    const Page = parseInt(page)

    const Size = parseInt(size)

    const result = await prisma.chongduWorlds({
        skip: (Page - 1) * Size,
        first: Size,
        orderBy: "ct_DESC",
        where:{
            type:type,
        }
    }).$fragment(`
    fragment world on chongduWorld { 
        id
        commentStatus
        ct
        description
        gif
        image
        joinCount
        praiseCount
        shareCount
        type
        video
        viewCount
        userId {
          id
          username
          type
          nickname
          icon
          phone
          regtime
          lastlogintime
          isauthent
          ct
          mt
        }
      }
  `)

    const total = await prisma.chongduWorldsConnection({
        where:{
            type:type
        }
    }).aggregate().count()


    return res.json({
        data: result,
        total: total
    })
    
})


module.exports = router