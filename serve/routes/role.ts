import * as express from 'express'
import { prisma } from '../generated/prisma-client';

const router = express.Router()

router.get(`/list`, async (req, res) => {

    const result = await prisma.chongduRoleGroups()

    return res.json(result)
})

router.get(`/menus`, async (req, res) => {
    const { id } = req.query
    const result = await prisma.chongduRoleMenus({
        where: {
            roleGroupId: {
                id: parseInt(id)
            }
        }
    })

    const resultJson = await Promise.all(result.map(async (item, index) => {
        const childrenIds = item.menuChildrenId.split(",").map(Number)
        const childrenMenus = await prisma.chongduRoleMenuChildrens({
            where: {
                id_in: childrenIds
            }
        })

        const allMenuChildren = await prisma.chongduRoleMenuChildrens({
            where: {
                menuUrlName: item.menuUrl
            }
        })

        return {
            id: item.id,
            menuName: item.menuName,
            menuUrl: item.menuUrl,
            menuChildren: childrenMenus,
            allMenuChildren: allMenuChildren,
            menuIds: item.menuChildrenId,
        }
    }))

    return res.json(resultJson)
})

router.post(`/edit`, async (req, res) => {

    const { editArr } = req.body

    const result = await Promise.all(editArr.map(async (item, index) => {
        await prisma.updateChongduRoleMenu({
            data: {
                menuChildrenId: item.ids.join(),
            },
            where: {
                id: item.id
            }
        })
    }))

    return res.json(result)
})

router.post(`/delete`,async (req,res)=>{

    const { ids } = req.body

    const result = await prisma.deleteManyChongduRoleGroups({
      id_in: ids
    })
  
    return res.json(result)
})

router.get(`/allmenus`, async (req, res) => {

    const roleMenuResult: {
        id: number,
        menuId: {
            menuName: string
        },
        authName: string,
        menuUrlName: string,
        action: string,
    }[] = await prisma.chongduRoleMenuChildrens().$fragment(`
        fragment ChongduRoleMenuChild on ChongduRoleMenuChildren { 
            id
            menuId{
                menuName
            }
            authName
            menuUrlName
            action
        }
    `)

    const menuUrlNameList = []

    const result = {}
    roleMenuResult.map((item) => {
        if (menuUrlNameList.includes(item.menuUrlName)) {
            result[item.menuUrlName].allMenuChildren.push({
                id: item.id,
                authName: item.authName,
                action: item.action,
                menuUrlName: item.menuUrlName,
            })
            return
        } else {
            menuUrlNameList.push(item.menuUrlName)
            result[item.menuUrlName] = {
                allMenuChildren: [{
                    id: item.id,
                    authName: item.authName,
                    action: item.action,
                    menuUrlName: item.menuUrlName,
                }],
                menuName:item.menuId.menuName
            }
        }
    })


    return res.json(result)

})

router.post(`/add`, async (req, res) => {

    const { name ,editArr } = req.body

    const createdRoleGroup = await prisma.createChongduRoleGroup({
        roleName:name
    })

    const result = await Promise.all(editArr.map(async (item, index) => {
        await prisma.createChongduRoleMenu({
            menuName:item.name,
            menuUrl:item.id,
            menuChildrenId:item.ids.join(),
            roleGroupId:{
                connect:{
                    id:createdRoleGroup.id
                }
            }
        })
    }))

    return res.json(result)
})

module.exports = router