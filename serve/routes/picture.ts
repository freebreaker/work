import * as express from 'express'
import axios from 'axios';

const router = express.Router()

router.get(`/list`,async (req, res) => {

    const {current ,limit} = req.query

    let result = {}

    const resultFormJava = await axios({
        method:"get",
        url:`http://106.12.82.83:8080/api/v1/chongdu/filemanage/getPublicFile?current=${current}&limit=${limit}`
    }).then((res:any)=>{
        if(res.data){
            result = res.data
        }
    })

    return res.json({
        ...result
    })
})


module.exports = router