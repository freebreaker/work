

import * as redis from 'redis';

import {promisifyAll} from 'bluebird';

promisifyAll(redis.RedisClient.prototype)

export const client = redis.createClient(6379, 'localhost');
