import { Router } from 'express'

import * as authController from './auth-controller'

const routes = Router()

routes.post('/signup', authController.signup)

export default routes
