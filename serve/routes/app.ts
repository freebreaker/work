import { ChongduAppVersion } from './../generated/prisma-client/index';
import * as express from 'express'
import { prisma } from '../generated/prisma-client';
import * as fs from 'fs'
import * as multer from 'multer'
import * as path from 'path';


const router = express.Router()

const upload = multer({ dest: path.join(__dirname, '../build/app/') });

router.get(`/versions`, async (req, res) => {

    const result = await prisma.chongduAppVersions()

    return res.json(result)

})

// 上传app 信息
router.post(`/upload`, async (req, res) => {

    const { fileName, deviceType, appId, appCode, appVersion, appUrl, description, forces, cuserId, muserId, } = req.body

    const result = await prisma.createChongduAppVersion({
      fileName: fileName,
      deviceType: deviceType,
      appId: appId,
      appCode: appCode,
      appVersion: appVersion,
      url: appUrl,
      description: description,
      forces: forces,
      cuserId: cuserId,
      muserId: muserId,
      status: 1,
      ct: new Date().getTime().toString(),
      mt: new Date().getTime().toString(),
      d: 1
    })
  
    return res.json(result)

}) 

// 删除app
router.post(`/delete`, async (req, res) => {

    const { ids } = req.body

    const resultToUpload: [ChongduAppVersion] = await prisma.chongduAppVersions({ where: { id_in: ids } }).$fragment(
      `
      fragment app on ChongduAppVersion {
        fileName
        url
      } 
      `
    )
  

    for (let i = 0; i < resultToUpload.length; i++) {
      await fs.unlinkSync(path.join(__dirname, '../build/app/') + `${resultToUpload[i].fileName}`)
    }
  
    const result = await prisma.deleteManyChongduAppVersions({
      id_in: ids
    })
  
    return res.json(result)

})

// 下载apk
router.get('/download', async (req, res) => {

  const { name } = req.query

  res.download(`./build/app/${name}`, name)

})

// 上传apk
router.post('/apk', upload.single('file'), (req, res) => {

    const temp_path = req.file.path;
  
    const ext = req.file.originalname.split('.')[1];
     
    // const target_path = req.file.destination + req.file.originalname
  
    const target_path = req.file.destination + `chongdu_v${req.body.appVersion}_android_release.${ext}`
  
    const filePath = `app/chongdu_v${req.body.appVersion}_android_release.${ext}`;
  
    fs.rename(temp_path, target_path, (error: any) => {
  
      if (!error) {
        return res.json({
          filePath: filePath,
          fileName: `chongdu_v${req.body.appVersion}_android_release.${ext}`
        })
  
      }
    });
  });


module.exports = router