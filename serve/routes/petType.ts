import { getUserId } from './../util/index';
import * as express from 'express'
import { prisma } from '../generated/prisma-client';
import * as moment from 'moment'
import { version } from 'punycode';
import getClientIp from '../util/getIp';
import { createDataVersion } from '../util/updateDataVersion';

const router = express.Router()

router.get(`/list`, async (req, res) => {

    const {page} = req.query

    const result = await prisma.chongduPetTypes()

    return res.json(result)
})

router.post(`/add`, async (req, res) => {

    const { name, ppid, pid, image, level } = req.body

    const result = await prisma.createChongduPetType({
      name: name,
      ppid: ppid,
      pid: pid,
      image: image,
      level: level,
      ct: new Date().getTime().toString()
    })

    await createDataVersion(prisma.createChongduDataVersion,{
      type:0,
      name:"宠物类型",
      versionCode:"cw"
    },req)
  
    return res.json(result)

})

router.post(`/edit`, async (req, res) => {

    const { id, name, pid, image, } = req.body

    const result = await prisma.updateChongduPetType({
      data: {
        name: name,
        pid: pid,
        image: image,
        ct: new Date().getTime().toString()
      },
      where: {
        id: id
      }
    })
  
    return res.json(result)

})


router.post(`/delete`, async (req, res) => {

    const { ids } = req.body

    const result = await prisma.deleteManyChongduPetTypes({
      id_in: ids
    })
  
    return res.json(result)

})




module.exports = router