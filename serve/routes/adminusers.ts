import { cryptoPwd } from './../util/crypto';
import { getUserId } from './../util/index';
import * as express from 'express'
import { prisma } from '../generated/prisma-client';
import * as jwt from 'jsonwebtoken'
import { client } from '../util/redis';

const router = express.Router()

router.get(`/list`, async (req, res) => {

    const result = await prisma.adminUsers().$fragment(`
        fragment admin on adminUser {
            id
            name
            realName
            phone
            role {
                id
            }
            createdAt
            lastLoginAt
        }
    `)

    return res.json(result)
})

router.post(`/add`, async (req, res) => {
    
    const { name, pwd , realName , phone} = req.body

    const result = await prisma.createAdminUser({
        name: name,
        pwd: cryptoPwd(pwd),
        realName:realName,
        phone:phone
    })

    return res.json(result)

})

router.post(`/delete` , async(req , res)=>{

    const {ids} = req.body

    const result = await prisma.deleteManyAdminUsers({
        id_in: ids
    })

    return res.json(result)
})

router.post(`/edit` , async(req,res)=>{

    const {
        id,
        name,
        pwd,
        realName,
        phone
    } = req.body
    
    let cryptoPwdString = undefined

    if(pwd){
        cryptoPwdString = cryptoPwd(pwd)
    }

    const Authorization = req.headers['authorization']
  
    const { adminUserId ,verifiedToken } = await getUserId(Authorization)

    const result = await prisma.updateAdminUser({
        where:{
            id:id
        },
        data:{
            name:name ,
            pwd:cryptoPwdString,
            realName:realName,
            phone:phone
        }
    })

    if(id === adminUserId){

        const token = jwt.sign({
            name: name,
            admin: cryptoPwdString
        }, 'secret', { expiresIn: "1 days" })
    
        // client.set(token, name)
    
        client.set(name, token)
    
        client.expire(name, 3600)

        return res.json({
            success:true,
            token:token
        })
    }

    return res.json(result)
})
module.exports = router