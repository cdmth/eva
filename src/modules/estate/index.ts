import { Router } from 'express'
import * as estateController from './estate-controller'

const routes = Router()

routes.use('/', estateController.estateEndpoint)

export default routes
