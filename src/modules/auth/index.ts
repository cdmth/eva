import { Router } from 'express'

import * as authController from './auth-controller'
import * as authServices from './auth-services'

const routes = Router()
routes.post('/signup', authController.signup)
routes.post('/login', authServices.loginMiddleWare, authController.login)
routes.post('/update', authServices.jwtMiddleWare, authController.update)

export default routes
