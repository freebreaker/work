
import * as express from 'express'
import { prisma } from '../generated/prisma-client';

const router = express.Router()

router.post(`/list`, async (req, res) => {

    const result = await prisma.chongduInforms().$fragment(`
    fragment inform on chongduInform { 
        id
        type
        ct
        description
        relatedType
        relatedId
        image
        status
        disposeBy{
          id
          name
        }
        disposeAt
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


    const total = await prisma.chongduInformsConnection().aggregate().count()


    return res.json({
        data: result,
        total: total
    })

})

module.exports = router