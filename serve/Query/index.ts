import { prismaObjectType } from 'nexus-prisma'
/**
 * 登录查询
 */

export const Query = prismaObjectType({
    name: 'Query',
    definition: (t) => t.prismaFields(['*'])
})