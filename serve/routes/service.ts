import { getUserId } from './../util/index';
import * as express from 'express'
import { prisma } from '../generated/prisma-client';

const router = express.Router()

router.get(`/list`, async (req, res) => {

    const result = await prisma.chongduServiceTypes()

    return res.json(result)

})

router.post(`/add`, async (req, res) => {

  const { name, pid, img, level, } = req.body

  const Authorization = req.headers['authorization']

  const { adminUserId } = await getUserId(Authorization)

  if (adminUserId) {

    const result = await prisma.createChongduServiceType({
      name: name,
      pid: pid,
      img: img,
      level: level,
      ct: new Date().getTime().toString(),
      mt: new Date().getTime().toString(),
      cuserId: adminUserId,
      muserId: adminUserId
    })
    return res.json(result)
  } else {
    return res.json(null)
  }

})

router.post(`/edit`, async (req, res) => {

    const { id, name, image, mt } = req.body

    const Authorization = req.headers['authorization']
  
    const { adminUserId } = await getUserId(Authorization)
  
    if (adminUserId) {
  
      const result = await prisma.updateChongduServiceType({
        data: {
          name: name,
          img: image,
          mt: new Date().getTime().toString(),
          muserId: adminUserId
        },
        where: {
          id: id
        }
      })
      return res.json(result)
    } else {
      return res.json(null)
    }

})


router.post(`/delete`, async (req, res) => {

    const { ids } = req.body

    const result = await prisma.deleteManyChongduServiceTypes({
      id_in: ids
    })
  
    return res.json(result)

})




module.exports = router