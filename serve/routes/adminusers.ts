import { getUserId } from './../util/index';
import * as express from 'express'
import { prisma } from '../generated/prisma-client';
import * as jwt from 'jsonwebtoken'
import { client } from '../util/redis';

const router = express.Router()

router.get(`/list`, async (req, res) => {

    const result = await prisma.chongduAdmins().$fragment(`
        fragment chongduAdmin on ChongduAdmin {
            id
            name
            nickname
            realName
            rt
            tel
            ip
            ct
            icon
            cityCode
            lastLoginTime
            groupId {
                id
                roleName
            }
        }
    `)

    return res.json(result)
})

router.post(`/group`, async(req,res)=>{

    const {groupId,adminId} = req.body

    const result = await prisma.updateChongduAdmin({
        where:{
            id:adminId
        },
        data:{
            groupId:{
                connect:{
                    id:groupId
                }
            }
        }
    })

    return res.json(result)

})

router.post(`/add` , async(req,res)=>{

    const {
        name,
        pwd,
        realName,
        groupId,
        email,
        phone,
        cityCode,
        icon
      } = req.body

    const result = await prisma.createChongduAdmin({
        name:name ,
        pwd:pwd,
        realName:realName,
        mail:email,
        tel:phone,
        cityCode:cityCode,
        icon:icon,
        groupId:{
            connect:{
                id:groupId
            }
        },
        ct:new Date().getTime().toString()
    })

    return res.json(result)
})

router.post(`/password`, async (req, res) => {

    const {oldpassword,newpassword,newpassword2} = req.body

    const Authorization = req.headers['authorization']
  
    const { adminUserId ,verifiedToken } = await getUserId(Authorization)

    const AdminUserResult = await prisma.chongduAdmins({
        where:{
            id:adminUserId,
            pwd:oldpassword
        }
    })

    if(AdminUserResult.length>0 && newpassword === newpassword2){

        const name = verifiedToken.name

        const token = jwt.sign({
            name: name,
            admin: newpassword
        }, 'secret', { expiresIn: "1 days" })

        client.set(token, name)
  
        client.set(name, token)

        client.expire(name, 3600)

        await prisma.updateChongduAdmin({
            where:{
                id:adminUserId
            },
            data:{
                pwd:newpassword
            }
        })
    
        return res.json({
            success:true,
            msg:"修改成功",
            token:token
        })
    }else{
        return res.json({
            success:false,
            msg:"旧密码错误"
        })
    }



})

module.exports = router