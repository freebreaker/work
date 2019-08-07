import { options, mac } from './../util/qiniu';
import { client } from './../util/redis';
import * as express from 'express'
import { prisma } from '../generated/prisma-client';
import * as jwt from 'jsonwebtoken'
import getClientIp from '../util/getIp';

import * as qiniu from 'qiniu';

const router = express.Router()

router.post(`/login`, async (req, res) => {

  const { name, pwd } = req.body;

  const result = await prisma.adminUsers({

    where: {

      name: name,

      pwd: pwd

    }

  })

  const payload = {

    name: name,

    admin: pwd

  }

  const secret = 'secret'

  const token = jwt.sign(payload, secret, { expiresIn: "1 days" })
  // 如果用户存在，将token存入redis

  if (result[0]) {

    client.on("error", function (err: any) {

      console.log("Error " + err);

    });

    let promise = new Promise((resolve, reject) => {

      client.get(name, async (err, reply) => {

        if (reply) {
          
          client.del(name)

          console.log("已在其他地方登录")

        }

          // client.set(token, name)

        client.set(name, token)

        client.expire(name, 3600)

        resolve(reply)

      })

    })

    await prisma.updateAdminUser({
      where:{
        id:result[0].id
      },
      data:{
        name:name
      }
    })

    const putPolicy = new qiniu.rs.PutPolicy(options);

    const uploadToken = putPolicy.uploadToken(mac);

    return res.json({ 
      status: 200, 
      token: result[0] ? token : "", 
      msg: "登录成功", 
      uploadToken: uploadToken ,
      adminId:result[0].id
    })

  } else {

    return res.json({ status: 200, token: result[0] ? token : "", msg: "用户名或密码错误" })

  }
})


module.exports = router