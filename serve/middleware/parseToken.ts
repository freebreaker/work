import { getUserId } from './../util/index';
import { prisma } from '../generated/prisma-client';

export const parseToken = async (req, res, next) => {

  const Authorization = req.headers['authorization']

  const { adminUserId } = await getUserId(Authorization)

  if (adminUserId) {

    next()

  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("token 出错");
  }
}