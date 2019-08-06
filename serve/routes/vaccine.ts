import * as express from 'express'
import { prisma } from '../generated/prisma-client';


const router = express.Router()

router.get(`/list`, async (req, res) => {

    const result = await prisma.chongduVaccineBrands({
        where:{
            type:2
        }
    })

    return res.json(result)
})

router.post(`/add`, async (req, res) => {

    const { name, image, description } = req.body

    const result = await prisma.createChongduVaccineBrand({
        name: name,
        image: image,
        type:2,
        description: description,
        ct: new Date().getTime().toString(),
    })

    return res.json(result)
})

router.post(`/edit`, async (req, res) => {

    const { id, name, image, description } = req.body

    const result = await prisma.updateChongduVaccineBrand({
        data: {
            name: name,
            image: image,
            description: description
        },
        where: {
            id: id
        }
    })

    return res.json(result)

})

router.post(`/delete`, async (req, res) => {

    const { ids } = req.body

    const result = await prisma.deleteManyChongduVaccineBrands({
        id_in: ids
    })

    return res.json(result)

})


module.exports = router