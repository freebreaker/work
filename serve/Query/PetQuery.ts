import { ChongduUser } from './../generated/prisma-client/index';
import { prismaObjectType } from 'nexus-prisma'
import { stringArg } from 'nexus'

export const PetQuery = prismaObjectType({
    name: 'ChongduPet',
    definition: t => {

        t.prismaFields(['*'])
        /**
         * 宠物主人
        */
        t.field('User', {
            type: "ChongduUserauthent",
            args: {
                id: stringArg(),
            },
            resolve: async (_, { id }, ctx) => {
                
                const Ctx = ctx()

                const result: ChongduUser = await Ctx.prisma.chongduUser({
                    id:id
        
                })

                console.log(result.id,result.username)

                return result
                
            }
        })
    },
})





