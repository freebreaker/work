import * as express from 'express'
import { prisma } from '../generated/prisma-client';
import * as moment from 'moment'

const router = express.Router()

router.get(`/list`, async (req, res) => {

  const result: [any] = await prisma.chongduProductTypes().$fragment(`
    fragment productType on ChongduProductType { 
      id 
      name
      img
      level
      status
      ct
      mt
      pettypeId
      pid
    }
  `)

  const vResult = await Promise.all(result.map(async (item, index) => {
    const pettypeIdList = item.pettypeId.split(',')
    const petTypeList = await prisma.chongduPetTypes({
      where: {
        id_in: item.pettypeId === '-2' ? [] : pettypeIdList.map(Number)
      }
    }).$fragment(`
      fragment petType on ChongduPetType {
        id
        name
        ppid
      }
    `)
    item.petTypeList = petTypeList
    return item
  }))

  const petTypeList = await prisma.chongduPetTypes()

  return res.json({
    goodList: vResult,
    petTypeList: petTypeList,
  })
})

router.post(`/add`, async (req, res) => {

  const { name, pid, pettypeId, img, level, } = req.body
  console.log(pid)
  const result = await prisma.createChongduProductType({
    name: name,
    pid: parseInt(pid,10),
    img: img,
    level: level,
    // pettypeId: {
    //   connect: {
    //     id: pettypeId
    //   }
    // },
    pettypeId: pettypeId,
    ct: new Date().getTime().toString(),
    mt: new Date().getTime().toString(),
  })

  return res.json(result)

})

router.post(`/edit`, async (req, res) => {

  const { id, name, image, pid ,pettypeId , level} = req.body
 
  const Data = {
    name: name,
    img: image,
    mt: new Date().getTime().toString(),
    pid:pid,
    pettypeId:pettypeId?pettypeId:-2,
    level:level
  }

  const DataNoPetTypeId = {
    name: name,
    img: image,
    mt: new Date().getTime().toString(),
    pid:pid,
    level:level
  }

  const result = await prisma.updateChongduProductType({
    data: pettypeId ? Data:DataNoPetTypeId,
    where: {
      id: id
    }
  })
  return res.json(result)

})


router.post(`/delete`, async (req, res) => {

  const { ids } = req.body

  const result = await prisma.deleteManyChongduProductTypes({
    id_in: ids
  })

  return res.json(result)

})




module.exports = router