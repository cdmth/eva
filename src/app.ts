import * as express from 'express';
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'

import middlewares from './config/middlewares'
import './config/db'
import routes from './modules'

const app = express()

middlewares(app)

const AuthSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const register = ({ email, password }) => {
  if(!email) {
    throw new Error('email_required')
  } else if(!password) {
    throw new Error('password_required')
  }

  try {
    return mongoose.model('Auth', AuthSchema).create({ email, password })
  } catch (err) {
    throw err
  }
}

app.use('/api/v1', routes)

export default app