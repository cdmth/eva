import * as express from 'express';
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'

import middlewares from './config/middlewares'
import './config/db'
import routes from './modules'

const app = express()
middlewares(app)

app.use('/api/v1', routes)

export default app