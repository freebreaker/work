import { prismaObjectType } from 'nexus-prisma'

export const AdminLoginType = prismaObjectType({
  name: "ChongduAdmin",
  definition: t => {
    t.prismaFields(["*"])
    t.string("token")
    t.string("msg")
  }
})
