import { prismaObjectType } from 'nexus-prisma'
import { stringArg, idArg,arg } from 'nexus'
import { getUserId } from './../util/index';
import { sign } from 'jsonwebtoken'

import * as redis from 'redis';

const client = redis.createClient(6379, 'localhost');

export const Mutation = prismaObjectType({
  name: "Mutation",
  definition: (t) => {
    t.prismaFields(['*'])
    /**
     * 登陆
     */
    t.field("login", {
      type: "ChongduAdmin",
      args: {
        name: stringArg(),
        pwd: stringArg()
      },
      resolve: async (_, { name, pwd }, ctx) => {
        const result = await ctx.prisma.chongduAdmins({
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

        const token = sign(payload, secret, { expiresIn:  "15 days"})

        // 如果用户存在，将token存入redis

        if (result[0]) {
          
          client.on("error", function (err: any) {
            console.log("Error " + err);
          });

          client.set(token, name)

          let promise = new Promise((resolve, reject) => {
            client.get(name, async (err, reply) => {
              console.log("reply", reply)
              // client.del(name)
              if (reply) {
                console.log("已在其他地方登录")
              } else {
                console.log("第一次登陆")
                client.set(token, name)
                client.set(name, token)
              }
              resolve(reply)
            })
          })

          let Reply = await promise

          if (Reply) {
            return { ...{ id: "" }, token: "", msg: "已在其他地方登录" }
          } else {
            return { ...result[0], token: result[0] ? token : "", msg: "" }
          }


        } else {

          return { ...{ id: "" }, token: result[0] ? token : "", msg: "用户名或密码错误" }

        }

      }
    })
    /**
     * 登出
     */
    t.field('logout', {
      type: "ChongduAdmin",
      resolve: (_, args, ctx) => {
        const { token, verifiedToken } = getUserId(ctx)
        client.del(token)
        client.del(verifiedToken.name)
        return { ...{ id: "" }, token: "", msg: "登出成功！" }
      }
    })

    /**
     * apk 上传
     */
    t.field('uploadFile',{
      type:"ChongduAdmin",
      resolve: (_, args, ctx) => {
        console.log("上传文件")
        return { ...{ id: "" }, token: "", msg: "登出成功！" }
      }
    })

  }
})