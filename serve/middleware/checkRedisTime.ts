import { client } from './../util/redis';
import { getUserId } from './../util/index';

export const checkRedisTime = async (req, res, next) => {

    const Authorization = req.headers['authorization']

    if(!Authorization){
        return res.json({
            status:410,
            success:false,
            data:null,
            msg:"该账号已在异地登陆"
        })    
    }

    const { verifiedToken,token } = await getUserId(Authorization)

    process.on('unhandledRejection', (reason)=>{
        next(reason)
    });

    const name = verifiedToken.name
     
    if (name) {
        
        client.on("error", function (err: any) {

            res.end("redis close")         
      
        });

        let promise = new Promise((resolve, reject) => { 

            client.get(name, async (err, reply) => {
      
              resolve(reply)
      
            })
      
        })
        
        const Reply = await promise

        if(Reply){
            if(Reply === token){
                client.expire(name,7200)
                next()
            }else{
                return res.json({
                    status:409,
                    success:false,
                    data:null,
                    msg:"该账号已在异地登陆"
                })    
            }
        }else{
            return res.json({
                status:409,
                success:false,
                data:null,
                msg:"闲置超时，请重新登陆"
            })      
        }

    } else {

        res.writeHead(200, { "Content-Type": "text/plain" });

        res.end("token error");

    }
}