import { ChongduTradingArea } from './../generated/prisma-client/index';
import * as express from 'express'
import { prisma } from '../generated/prisma-client';


const router = express.Router()

router.get(`/list`, async (req, res) => {

    const result = await prisma.chongduTradingAreas()

    return res.json(result)
})

router.post(`/add`, async (req, res) => {

    const {area , round} = req.body
    
    const cityNameArr = await prisma.chongduCities({
        where:{
            code:area
        }
    })

    if(cityNameArr.length === 1){

        const tradingAreaNameResult = await prisma.chongduTradingAreas({
            where:{
                tradingAreaName:round
            }
        })

        if(tradingAreaNameResult.length>0){
            return res.json(tradingAreaNameResult)
        }

        const result = await prisma.createChongduTradingArea({
            cityCode:area,
            cityName: cityNameArr[0].name,
            tradingAreaName:round
        })

        return res.json(result)

    }else{
        return null
    }

})

router.post(`/delete`,async (req,res)=>{

    const {id}:{id:number}= req.body

    await prisma.deleteChongduTradingArea({
        id:id
    })

    const result = await prisma.chongduTradingAreas()

    return res.json(result)

})


module.exports = router