import { getUserId } from './../util/index';
import { prisma } from '../generated/prisma-client';
import { checkBaseUrl } from '../util/checkbaseurl';
import { checkChildrenUrl } from '../util/checkchildrenurl';

export const checkApiAuth = async (req, res, next) => {

    const Authorization = req.headers['authorization']

    const { adminUserId } = await getUserId(Authorization)

    const groupIdArr: any = await prisma.chongduAdmin({ id: adminUserId }).$fragment(`
        fragment group on ChongduAdmin {
            groupId {
                id
            }
        }
    `)

    const groupRole = await prisma.chongduRoleGroup({
        id: groupIdArr.groupId.id
    })

    const menus: any[] = await prisma.chongduRoleMenus({
        where: {
            roleGroupId: {
                id: groupRole.id
            }
        }
    })

    const childrenMenus = await Promise.all(menus.map(async (item, index) => {
        const menuChildrenIdArr = item.menuChildrenId?item.menuChildrenId.split(',').map(Number):[]
        const menuChildrenList = await prisma.chongduRoleMenuChildrens({
            where: {
                id_in: menuChildrenIdArr
            }
        }).$fragment(`
            fragment chongduRoleMenuChildren on ChongduRoleMenuChildren {
                action
            }
        `)
        item.menuChildren = menuChildrenList
        return item
    }))

    // console.log(menus)
    // console.log(`---------------------------`)
    // console.log(childrenMenus)
    if (checkBaseUrl(req.baseUrl.substr(1), childrenMenus)) {
        
        if (checkChildrenUrl(req.baseUrl.substr(1), req.url.split("?")[0].substr(1), childrenMenus)) {
            next()
        } else {
            return res.json({
                success: false,
                msg: "您没有此子菜单权限！",
                status:401,
                data:null
            })
        }

    } else {
        return res.json({
            success: false,
            msg: "您没有此权限！",
            status:401,
            data:null
        })
    }
}