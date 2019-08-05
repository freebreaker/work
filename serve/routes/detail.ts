import { ChongduProductSku } from './../generated/prisma-client/index';
import * as express from 'express'
import { prisma } from '../generated/prisma-client';
import * as moment from 'moment'
import { getPrivateDownloadUrl } from '../util/privateQiniu';
import key from '../util/cardNumKey';

const router = express.Router()

router.get(`/pet`, async (req, res) => {

  const { id } = req.query

  const result: any = await prisma.chongduPet({ id: id }).$fragment(`
      fragment petdetail on chongduPet {
        id
        name
        title
        sex
        birthday
        color
        price
        content
        citycode
        addressId
        userId {
          id
          phone
          username
          nickname
        }
      }
  `)
  
  if (result.citycode !==null) {
    const city = await prisma.chongduCities({
      where: {
        code: result.citycode
      }
    })
    result.citycode = city.length > 0 && city[0].name ? city[0].name : "暂无"
  }

  if (result.addressId) {
    const address = await prisma.chongduAddress({
      id: result.addressId
    })
    result.addressId = address ? `${address.province}${address.city}${address.region}${
      address.detailAdd
      }` : "暂无"
  }

  // console.log(await prisma.chongduPet({ id: id }).userId)
  // 宠物信息
  const petImgResult = await prisma.chongduPetImgs({

    where: {
      petId: id
    }

  })

  // 疫苗信息
  const vaccineImgResult = await prisma.chongduVaccines({

    where: {
      petId: id
    }

  })

  // 驱虫信息
  const repellentImgResult = await prisma.chongduRepellents({

    where: {
      petId: id
    }

  })

  const records = await prisma.chongduPetauthentLogs({
    where: {
      petauthentId: id
    }
  }).$fragment(`
  fragment petlog on chongduPetauthentLog {
    cadminId {
      id
      name
    }
    status
    ct
    remark
  }
`)

  return res.json({
    ...result,
    ...{ imgMsgs: petImgResult },
    ...{ vacMsgs: vaccineImgResult },
    ...{ repMsgs: repellentImgResult },
    records: records
  })

})

router.get(`/product`, async (req, res) => {
  const { id } = req.query

  const result = await prisma.chongduProduct({ id: id }).$fragment(`
    fragment product on chongduProduct {
      id
      typeId{
        name
      }
      content
      name
      price
      title
      brandId {
        name
        logoImg
      }
      merchantId {
        name
        address
        tel
        icon
        city
        citycode
        beginTime
        endTime
      }
    }
  `)

  const stockResult = await prisma.chongduProductSkus({
    where: {
      productId: id
    }
  })


  const productImgResult = await prisma.chongduProductImgs({
    where: {
      productId: id
    }
  })

  const productauthentLogs = await prisma.chongduProductauthentLogs({
    where: {
      productauthentId: id
    }
  }).$fragment(`
      fragment productlog on chongduProductauthentLog {
        cadminId {
          id
          name
        }
        status
        ct
        remark
      }
  `)

  return res.json({
    ...result,
    ...{
      stockId: stockResult[0]
    },
    ...{ imgMsgs: productImgResult },
    records: productauthentLogs
  })

})

router.get(`/user`, async (req, res) => {

  const { id } = req.query

  const result = await prisma.chongduUserauthent({ id: id })

  const cardNum = key.decrypt(result.cardNum,'utf8');


  const backPhotoArr = result.backPhoto?result.backPhoto.split("/"):[]
  const frontPhotoArr = result.frontPhoto?result.frontPhoto.split("/"):[]
  const handPhotoArr = result.handPhoto?result.handPhoto.split("/"):[]


  const privateBackPhoto = await getPrivateDownloadUrl(backPhotoArr[backPhotoArr.length - 1])

  const privatefrontPhoto = await getPrivateDownloadUrl(frontPhotoArr[frontPhotoArr.length - 1])

  const privateHandPhoto = await getPrivateDownloadUrl(handPhotoArr[handPhotoArr.length - 1])

  const productImgResult = await prisma.chongduProductImgs({
    where: {
      productId: id
    }
  })

  const userauthentLogs = await prisma.chongduUserauthentLogs({
    where: {
      userauthentId: id
    }
  }).$fragment(`
      fragment userlog on chongduUserauthentLog {
        cadminId {
          id
          name
        }
        status
        ct
        remark
      }
  `)

  const Result = Object.assign({}, result, {
    backPhoto: privateBackPhoto,
    frontPhoto:privatefrontPhoto,
    handPhoto:privateHandPhoto,
    cardNum:cardNum
  })

  return res.json({
    ...Result,
    ...{ imgMsgs: productImgResult },
    records: userauthentLogs
  })

})

router.get(`/company`, async (req, res) => {

  const { id } = req.query

  const result = await prisma.chongduCompanyauthent({ id: id })

  const backPhotoArr = result.backPhoto?result.backPhoto.split("/"):[]
  const frontPhotoArr = result.frontPhoto?result.frontPhoto.split("/"):[]
  const handPhotoArr = result.handPhoto?result.handPhoto.split("/"):[]
  const bisPhotoArr = result.bisPhoto?result.bisPhoto.split("/"):[]
  const otherPhotoArr = result.otherPhoto?result.otherPhoto.split("/"):[]

  const privateBackPhoto = await getPrivateDownloadUrl(backPhotoArr[backPhotoArr.length - 1])

  const privatefrontPhoto = await getPrivateDownloadUrl(frontPhotoArr[frontPhotoArr.length - 1])

  const privateHandPhoto = await getPrivateDownloadUrl(handPhotoArr[handPhotoArr.length - 1])

  const privateBisPhoto = await getPrivateDownloadUrl(bisPhotoArr[bisPhotoArr.length - 1])

  const privateOtherPhoto = await getPrivateDownloadUrl(otherPhotoArr[otherPhotoArr.length - 1])


  const companyauthentLogs = await prisma.chongduCompanyauthentLogs({
    where: {
      companyauthentId: id
    }
  }).$fragment(`
      fragment companylog on chongduCompanyauthentLog {
        cadminId {
          id
          name
        }
        status
        ct
        remark
      }
  `)

    const Result = Object.assign({}, result, {
      backPhoto: privateBackPhoto,
      frontPhoto:privatefrontPhoto,
      handPhoto:privateHandPhoto,
      bisPhoto:privateBisPhoto,
      otherPhoto:privateOtherPhoto
    })

  return res.json({
    ...Result,
    records: companyauthentLogs
  })

})

router.get('/service', async (req,res)=>{

  const { id } = req.query
  
  const result = await prisma.chongduService({id:id}).$fragment(`
    fragment chongduService on chongduService {
      id
      name
      title
      shareCount
      browser
      icon
      sale
      status
      price
      content
      ct
      mt
      area
      starttime
      endtime
      userId {
        id
        phone
        username
        nickname
      }
      merchantId {
        id
      }
      typeId{
        id
        name
      }
    }
  `)

  const serviceauthentlogs = await prisma.chongduServiceAuthentdetails()

  return res.json({
    ...result,
    records: serviceauthentlogs
  })

})

module.exports = router