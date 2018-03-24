import app from './app'

import constants from './config/constants'
import middlewares from './config/middlewares'
import Routes from './modules'
import './config/db'

middlewares(app)

app.use('/api/v1', Routes)

app.listen(constants.PORT, (err) => {
  if(err) {
    throw err
  }

  console.log(`Server running on port ${constants.PORT}`)
  console.log(`Environment ${process.env.NODE_ENV}`)
})