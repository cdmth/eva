import * as bodyParser from 'body-parser'
import constants from './constants'

export default app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  if(process.env.NODE_ENV === 'development') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
  }
}