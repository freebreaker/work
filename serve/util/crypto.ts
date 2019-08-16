const crypto = require('crypto');

export const cryptoPwd = (pwd:string)=>{

    const hmac = crypto.createHmac('sha256', 'login-secret-key');

    hmac.update(pwd);

    return hmac.digest('hex')

}