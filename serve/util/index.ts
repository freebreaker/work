import {verify} from 'jsonwebtoken'
import { prisma } from '../generated/prisma-client';

class AuthError extends Error {
    constructor() {
      super('Not authorized')
    }
}

export const APP_SECRET = 'secret'

export const getUserId = async (Authorization:any)=>{

    if (Authorization) {
        
      const token = Authorization
      
      const verifiedToken:any = verify(token, APP_SECRET)

      const AdminUsers = await prisma.chongduAdmins({

        where: {
  
          name: verifiedToken.name,
  
          pwd: verifiedToken.admin
  
        }
  
      })

      const adminUserId = AdminUsers[0].id

      return {
        token:token,
        verifiedToken:verifiedToken,
        adminUserId:adminUserId
      }
    }

}
