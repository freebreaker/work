import { getUserId } from './../util/index';
import { client } from './../util/redis';
import * as express from 'express'

const router = express.Router()

router.post(`/`,async (req, res) => {

    const Authorization = req.headers['authorization']
  
    const { verifiedToken } = await getUserId(Authorization)
  
    if (verifiedToken) {
  
      client.del(Authorization)
  
      client.del(verifiedToken.name)
  
    }
    return res.json({ status: 200, msg: "登出成功" })
  })


module.exports = router