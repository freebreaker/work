
import * as qiniu from 'qiniu';

const accessKey = '95uPoPWjcYHEt9hvT_IQ2kJiuYlyawbO3KbO6tx5';
const secretKey = 'jyNQ6tKB903NEmdsPtTpzhnMMej3Edap-2eUU-VT';

export const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

export const options = {
    scope: "chongdu_ui",
    expires: 86400
};

// const putPolicy = new qiniu.rs.PutPolicy(options);

// export const uploadToken = putPolicy.uploadToken(mac);


