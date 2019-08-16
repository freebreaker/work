
import * as qiniu from 'qiniu';

const accessKey = '95uPoPWjcYHEt9hvT_IQ2kJiuYlyawbO3KbO6tx5';
const secretKey = 'jyNQ6tKB903NEmdsPtTpzhnMMej3Edap-2eUU-VT';

export const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const config = new qiniu.conf.Config();

const  bucketManager = new qiniu.rs.BucketManager(mac, config);

const privateBucketDomain = 'https://img.chongdu.com';

export const getPrivateDownloadUrl = (fileName:string)=>{
    const deadline = parseInt((Date.now()/1000).toString())+72000; // 20小时过期
    const privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, fileName, deadline);
    return privateDownloadUrl
}

