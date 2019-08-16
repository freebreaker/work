import { getUserId } from './../util/index';
import { rule, shield } from 'graphql-shield';
import { client } from './../util/redis';

const rules = {
  /**
   * 是否后台用户
   */
  isAuthenticatedUser: rule()(async (parent, args, context) => {

    const {token,verifiedToken} = getUserId(context)
    
    return Boolean(verifiedToken.name)

    // if(client.get(token)&&verifiedToken){
    //   client.pexpire(token,1000 * 60 * 3) // 重新设置过期时间
    //   return true
    // }else{
    //   console.log('凭证无效，session和redis已到期,需要登录');
    //   return false
    // }

  }),
}

export const permissions = shield({
  Query: {
    // chongduPetTypes: rules.isAuthenticatedUser,
  },
  Mutation:{
    logout:rules.isAuthenticatedUser,
  }
})
