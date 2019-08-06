import * as express from 'express'
import { prisma } from '../generated/prisma-client';

const router = express.Router()

router.get(`/list`, async (req, res) => {

    const { roleGroupId } = req.query

    const menusHad = await prisma.chongduRoleMenus({
        where: {
            roleGroupId: {
                id: parseInt(roleGroupId)
            }
        }
    })

    const result: [any] = await prisma.chongduMenus({
        where: {
            path_not_in: menusHad.map((item) => item.menuUrl)
        }
    }).$fragment(`
    fragment menu on ChongduMenu { 
      id 
      name
      path
    }
  `)

    return res.json(result)
})

router.get(`/path`, async (req, res) => {

    const { name } = req.query

    const result = await prisma.chongduRoleMenuChildrens({
        where: {
            menuUrlName: name
        }
    })

    return res.json(result)
})

router.post(`/add`, async (req, res) => {

    const { roleGroupId, menuName, menuAddMenuChildren, menuUrl } = req.body

    const result = await prisma.createChongduRoleMenu({
        roleGroupId: {
            connect: {
                id: roleGroupId
            }
        },
        menuName: menuName,
        menuChildrenId: menuAddMenuChildren.join(),
        menuUrl: menuUrl
    })

    return res.json(result)
})

router.post(`/addApiAndChildren`, async (req, res) => {

    const { api,apiChildren ,apiName,apiChildrenName} :{api:string,apiChildren:string[],apiName:string,apiChildrenName:string[]}= req.body

    const result = await prisma.createChongduMenu({
        path:api,
        name:apiName
    })

    const roleMenuResult = await prisma.createChongduRoleMenu({
        menuName:apiName,
        menuUrl:api,
        roleGroupId:{
            connect:{
                id:1
            }
        },
        menuChildrenId:"0"
    })

    for(let i=0;i<apiChildren.length;i++){
        await prisma.createChongduRoleMenuChildren({
            action:apiChildren[i],
            authName:apiChildrenName[i],
            menuUrlName:api,
            menuId:{
                connect:{
                    id:roleMenuResult.id
                }
            }
        })
    }


    return res.json(result)
})


module.exports = router