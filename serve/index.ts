import * as express from 'express'

import { checkRedisTime } from './middleware/checkRedisTime';

import { login, adminusers, logout} from './routes/index'

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

// app.use('/petType', checkApiAuth, petType)

// app.use(`/good`, checkApiAuth, good)

// app.use(`/app`, appAndApk)

// app.use(`/service`, checkApiAuth, service)

// app.use(`/audit`, checkApiAuth, audit)

// app.use(`/detail`, checkApiAuth, detail)

// app.use(`/role`, checkApiAuth, role)

// app.use('/menu', checkApiAuth, menu)

// app.use(`/user`,user)
 
// app.use(`/chart`, checkApiAuth,chart)

// app.use(`/vaccine`, checkApiAuth,vaccine)

// app.use(`/repellant`, checkApiAuth,repellant)

// app.use(`/inform`, checkApiAuth,inform)

// app.use(`/adminusers`, checkApiAuth, adminusers)

// app.use('/round', checkApiAuth, round)

// app.use('/personalRound',checkApiAuth,personalRound)

// app.use('/advertisement',checkApiAuth,advertisement)

// app.use('/recommend' , recommend)

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