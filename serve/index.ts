import * as express from 'express'

import { checkRedisTime } from './middleware/checkRedisTime';

import { login, adminusers, logout ,pics} from './routes/index'

import { checkApiAuth } from './middleware/checkApiAuth';

const path = require('path')

import * as connectHistoryApiFallback from 'connect-history-api-fallback';

const app = express()

const bodyParser = require('body-parser')

app.use('/', connectHistoryApiFallback());

app.use(express.static(path.join(__dirname, 'build')))

app.set('trust proxy', true);

process.setMaxListeners(0);

process.on('uncaughtException', function(err) {
  console.log(err.stack);
  console.log('NOT exit...');
});


app.use(bodyParser.json())

app.post(`/login`, login)

app.use(`/logout`,logout)

app.use(checkRedisTime)

app.use(`/adminusers`, adminusers)

app.use('/pics',pics)

app.use((err, req, res, next) =>{
  
  if (res.headersSent) {
    return next(err);
  }
  return res.json({
      status:500,
      success:false,
      data:null,
      msg:"服务器出错了："+ err
  })
});

app.listen(8081, () =>

  console.log('Server is running on http://localhost:8081'),

)