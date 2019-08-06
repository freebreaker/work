import { getUserId } from './../util/index';
import * as express from 'express'
import { prisma } from '../generated/prisma-client';
// import * as moment from 'moment'
import { v1 } from 'uuid'
import { sendMessage } from '../util/sendMessage';

const router = express.Router()
/**
 * 获取宠物审核列表
 */
router.post(`/petList`, async (req, res) => {

  const { page, size, status }: { page: string, size: string, status: string[] } = req.body

  const Page = parseInt(page)

  const Size = parseInt(size)

  const filteredStatus = status.map(Number)

  const result = await prisma.chongduPets({
    skip: (Page - 1) * Size,
    first: Size,
    orderBy: "status_ASC",
    where: {
      status_in: filteredStatus
    }
  }).$fragment(`
    fragment pet on chongduPet { 
        id
        title
        content
        status
        ct
        mt
        price
        typeId {
            id
            name
        }
        userId {
          id
          nickname
          username
        }
      }
  `)

  const total = await prisma.chongduPetsConnection({
    where: {
      status_in: filteredStatus
    }
  }).aggregate().count()

  return res.json({
    data: result,
    total: total
  })
})
/**
 * 获取商品审核列表
 */
router.post(`/productList`, async (req, res) => {

  const { page, size, status }: { page: string, size: string, status: string[] } = req.body

  const Page = parseInt(page)

  const Size = parseInt(size)

  const filteredStatus = status.map(Number)

  const result = await prisma.chongduProductAuthentdetails({
    skip: (Page - 1) * Size,
    first: Size,
    orderBy: "ct_DESC",
    where: {
      audit_in: filteredStatus
    }
  }).$fragment(`
  fragment ChongduProductAuthentdetail on ChongduProductAuthentdetail { 
      id 
      title
      content
      audit
      ct
      productId {
        id
        title
        name
        price
        typeId {
          id
          name
        }
      }
      userid {
        id
        nickname
        username
      }
    }
  `)

  const total = await prisma.chongduProductAuthentdetailsConnection({
    where: {
      status_in: filteredStatus
    }
  }).aggregate().count()

  return res.json({
    data: result,
    total: total
  })
})
/**
 * 获取用户审核列表
 */
router.post(`/userList`, async (req, res) => {

  const { page, size, status }: { page: string, size: string, status: string[] } = req.body

  const Page = parseInt(page)

  const Size = parseInt(size)

  const filteredStatus = status.map(Number)

  const result = await prisma.chongduUserauthents({
    skip: (Page - 1) * Size,
    first: Size,
    orderBy: "ct_DESC",
    where: {
      status_in: filteredStatus
    }
  }).$fragment(`
    fragment ChongduUserAuthent on ChongduUserAuthent { 
      id
      authtime
      frontPhoto
      realName
      status
      ct
      userId {
        nickname
        username
        icon
      }
    }
  `)

  const total = await prisma.chongduUserauthentsConnection({
    where: {
      status_in: filteredStatus
    }
  }).aggregate().count()

  return res.json({
    data: result,
    total: total
  })

})

/**
 * 获取企业审核列表
 */
router.post(`/companyList`, async (req, res) => {

  const { page, size, status }: { page: string, size: string, status: string[] } = req.body

  const Page = parseInt(page)

  const Size = parseInt(size)

  const filteredStatus = status.map(Number)

  const result = await prisma.chongduCompanyauthents({
    skip: (Page - 1) * Size,
    first: Size,
    orderBy: "ct_DESC",
    where: {
      status_in: filteredStatus
    }
  }).$fragment(`
  fragment ChongduCompanyAuthent on ChongduCompanyAuthent { 
    id
    authType
    backPhoto
    bisDate
    bisPhoto
    companyAddress
    ct
    d
    discription
    frontPhoto
    handPhoto
    headPhoto
    isSame
    legalDi
    legalName
    legalTel
    merchantId
    name
    nowAddress
    otherPhoto
    registMoney
    setupDate
    socialCode
    status
    userId {
      nickname
      username
    }
  }
  `)

  const total = await prisma.chongduCompanyauthentsConnection({
    where: {
      status_in: filteredStatus
    }
  }).aggregate().count()

  return res.json({
    data: result,
    total: total
  })

})

/**
 * 获取服务审核列表
 */
router.post(`/serviceList`, async (req, res) => {

  const { page, size, status }: { page: string, size: string, status: string[] } = req.body

  const Page = parseInt(page)

  const Size = parseInt(size)

  const filteredStatus = status.map(Number)

  const result = await prisma.chongduServices({
    skip: (Page - 1) * Size,
    first: Size,
    orderBy: "status_ASC",
    where: {
      status_in: filteredStatus
    }
  }).$fragment(`
    fragment service on chongduService { 
        id
        title
        content
        status
        mt
        ct
        price
        typeId {
          id
          name
        }
        userId {
          id
          nickname
          username
        }
      }
  `)

  const total = await prisma.chongduServicesConnection({
    where: {
      status_in: filteredStatus
    }
  }).aggregate().count()

  return res.json({
    data: result,
    total: total
  })

})

/**
 * 审核宠物
 */
router.post(`/pet`, async (req, res) => {

  const { audit, petAuthId, remark } = req.body

  const result = await prisma.updateManyChongduPets({
    data: {
      status: audit
    },
    where: {
      id: petAuthId
    }
  })

  const { adminUserId } = await getUserId(req.headers['authorization'])

  await prisma.createChongduPetauthentLog({
    petauthentId: petAuthId,
    status: audit,
    remark: remark,
    cadminId: {
      connect: {
        id: adminUserId,
      }
    },
    ct: new Date().getTime().toString(),
    d: 0
  })

  // 发布人id
  const publisherId = await prisma.chongduPet({
    id: petAuthId
  }).userId().id()

  const resultFromJava = await sendMessage(req, {
    content: "宠物审核结果",
    title: "宠物审核",
    pushAim: "2",
    type: 3,
    userId: publisherId
  })

  if (resultFromJava.success) {
    return res.json(result)
  } else {
    return res.json({
      status: 412,
      success: false,
      msg: "推送失败！"
    })
  }
})

/**
 * 审核商品
 */
router.post(`/product`, async (req, res) => {

  const { audit, productAuthId, remark } = req.body

  const result = await prisma.updateChongduProductAuthentdetail({
    data: {
      "audit": audit,
    },
    where: {
      id: productAuthId
    }
  })

  const { adminUserId } = await getUserId(req.headers['authorization'])

  await prisma.createChongduProductauthentLog({
    productauthentId: productAuthId.toString(),
    status: audit,
    remark: remark,
    cadminId: {
      connect: {
        id: adminUserId,
      }
    },
    ct: new Date().getTime().toString(),
    d: 0
  })

  // 发布人id
  const publisherId = await prisma.chongduProductAuthentdetail({
    id: productAuthId
  }).userid().id()

  const resultFromJava = await sendMessage(req, {
    content: "商品审核结果",
    title: "商品审核",
    pushAim: "2",
    type: 3,
    userId: publisherId
  })

  if (resultFromJava.success) {
    return res.json(result)
  } else {
    return res.json({
      status: 412,
      success: false,
      msg: "推送失败！"
    })
  }

})
/**
 * 用户认证
 */
router.post(`/user`, async (req, res) => {

  const { audit, UserAuthId, remark } = req.body

  const result = await prisma.updateChongduUserauthent({
    data: {
      status: audit
    },
    where: {
      id: UserAuthId
    }
  })

  // const adminId = await
  const { adminUserId } = await getUserId(req.headers['authorization'])

  await prisma.createChongduUserauthentLog({
    userauthentId: UserAuthId,
    status: audit,
    remark: remark,
    cadminId: {
      connect: {
        id: adminUserId,
      }
    },
    ct: new Date().getTime().toString(),
    d: 0
  })


  // 发布人id
  const publisherId = await prisma.chongduUserauthent({
    id: UserAuthId
  }).userId().id()

  const resultFromJava = await sendMessage(req, {
    content: "用户认证结果",
    title: "用户认证",
    pushAim: "1",
    type: 3,
    userId: publisherId
  })

  if (resultFromJava.success) {
    return res.json(result)
  } else {
    return res.json({
      status: 412,
      success: false,
      msg: "推送失败！"
    })
  }

})
/**
 * 企业认证
 */
router.post(`/company`, async (req, res) => {

  const { audit, CompanyAuthId, remark } = req.body

  const result = await prisma.updateChongduCompanyauthent({
    data: {
      status: audit
    },
    where: {
      id: CompanyAuthId
    }
  })

  const UserMsgs = await prisma.updateChongduCompanyauthent({
    data: {
      status: audit
    },
    where: {
      id: CompanyAuthId
    }
  }).userId()

  const ChongduMerchantId = await prisma.chongduMerchants({
    where: {
      id: UserMsgs.id
    }
  })

  if (audit === 1) {
    if (ChongduMerchantId.length > 0) {
      const merchantResult = await prisma.updateChongduMerchant({
        where: {
          id: ChongduMerchantId[0].id
        },
        data: {
          userId: UserMsgs.id,
          name: result.name, // 店名
          latitude: result.latitude,  // 纬度
          longitude: result.longitude, // 經度
          beginTime: "1561766400000", // 营业开始时间
          endTime: "1561798800000", // 营业结束时间
          attention: 0, // 关注度
          address: result.nowAddress, // 店铺地址
          tel: UserMsgs.phone,
          icon: UserMsgs.icon, // 商户头像
          citycode: result.citycode, // 城市编码
          city: result.city, // 城市名
        }
      })
      const merchantId = merchantResult.id
      await prisma.updateChongduCompanyauthent({
        data: {
          merchantId: merchantId ? merchantId : ""
        },
        where: {
          id: CompanyAuthId
        }
      })
    } else {
      const merchantResult = await prisma.createChongduMerchant({
        userId: UserMsgs.id,
        name: result.name, // 店名
        latitude: result.latitude,  // 纬度
        longitude: result.longitude, // 經度
        beginTime: "1561766400000", // 营业开始时间
        endTime: "1561798800000", // 营业结束时间
        attention: 0, // 关注度
        address: result.nowAddress, // 店铺地址
        tel: UserMsgs.phone,
        icon: UserMsgs.icon, // 商户头像
        citycode: result.citycode, // 城市编码
        city: result.city, // 城市名
      })
      const merchantId = merchantResult.id
      await prisma.updateChongduCompanyauthent({
        data: {
          merchantId: merchantId ? merchantId : ""
        },
        where: {
          id: CompanyAuthId
        }
      })
    }
  }

  // const adminId = await
  const { adminUserId } = await getUserId(req.headers['authorization'])

  await prisma.createChongduCompanyauthentLog({
    companyauthentId: CompanyAuthId,
    status: audit,
    remark: remark,
    cadminId: {
      connect: {
        id: adminUserId,
      }
    },
    ct: new Date().getTime().toString(),
    d: 0
  })

  // if(audit)
  // 发布人id
  const publisherId = await prisma.chongduCompanyauthent({
    id: CompanyAuthId
  }).userId().id()

  const resultFromJava = await sendMessage(req, {
    content: "企业认证结果",
    title: "企业认证",
    pushAim: "1",
    type: 3,
    userId: publisherId
  })

  if (resultFromJava.success) {
    return res.json(result)
  } else {
    return res.json({
      status: 412,
      success: false,
      msg: "推送失败！"
    })
  }
})

/**
 * 服务审核
 */
router.post(`/service`, async (req, res) => {

  const { audit, serviceAuthId, remark } = req.body

  const result = await prisma.updateChongduService({
    data: {
      status: 1
    },
    where: {
      id: serviceAuthId
    }
  })

  const { adminUserId } = await getUserId(req.headers['authorization'])

  await prisma.createChongduServiceauthentLog({
    serviceauthentId: serviceAuthId,
    status: audit,
    remark: remark,
    cadminId: {
      connect: {
        id: adminUserId,
      }
    },
    ct: new Date().getTime().toString(),
    d: 0
  })

  const publisherId = await prisma.chongduService({
    id: serviceAuthId
  }).userId().id()

  const resultFromJava = await sendMessage(req, {
    content: "服务审核结果",
    title: "服务审核",
    pushAim: "2",
    type: 3,
    userId: publisherId
  })

  if (resultFromJava.success) {
    return res.json(result)
  } else {
    return res.json({
      status: 412,
      success: false,
      msg: "推送失败！"
    })
  }

})
module.exports = router