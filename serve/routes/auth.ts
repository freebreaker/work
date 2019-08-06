import * as express from 'express'
import { prisma } from '../generated/prisma-client';
import * as moment from 'moment'

const router = express.Router()

router.get(`/petList`, async (req, res) => {

  const result = await prisma.chongduPetauthentdetails().$fragment(`
    fragment chongduPetauthentdetail on chongduPetauthentdetail { 
        id 
        title
        content
        audit
        mt
        ct
        petid { 
          id
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

  return res.json(result)
})

router.get(`/productList`, async (req, res) => {

  const result = await prisma.chongduProductAuthentdetails().$fragment(`
  fragment ChongduProductAuthentdetail on ChongduProductAuthentdetail { 
      id 
      title
      content
      audit
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

  return res.json(result)
})

router.get(`/userList`, async (req, res) => {

  const result = await prisma.chongduUserauthents({ orderBy: "ct_ASC" }).$fragment(`
  fragment ChongduUserAuthent on ChongduUserAuthent { 
    id
    authtime
    frontPhoto
    status
    ct
    userId {
      nickname
      username
    }
  }
  `)

  return res.json(result)

})


router.get(`/companyList`, async (req, res) => {

  const result = await prisma.chongduCompanyauthents({ orderBy: "ct_ASC" }).$fragment(`
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

  return res.json(result)

})
/**
 * 审核宠物
 */
router.post(`/pet`, async (req, res) => {

  const { audit, petAuthId } = req.body

  const result = await prisma.updateChongduPetauthentdetail({
    data: {
      "audit": audit
    },
    where: {
      id: petAuthId
    }
  })

  return res.json(result)

})

/**
 * 审核商品
 */
router.post(`/product`, async (req, res) => {

  const { audit, productAuthId } = req.body

  const result = await prisma.updateChongduProductAuthentdetail({
    data: {
      "audit": audit
    },
    where: {
      id: productAuthId
    }
  })

  return res.json(result)

})
/**
 * 用户认证
 */
router.post(`/user`, async (req, res) => {

  const { audit, UserAuthId } = req.body

  const result = await prisma.updateChongduUserauthent({
    data: {
      status: audit
    },
    where: {
      id: UserAuthId
    }
  })

  return res.json(result)

})
/**
 * 企业认证
 */
router.post(`/company`, async (req, res) => {

  const { audit, CompanyAuthId } = req.body

  const result = await prisma.updateChongduCompanyauthent({
    data: {
      status: audit
    },
    where: {
      id: CompanyAuthId
    }
  })

  return res.json(result)

})

module.exports = router