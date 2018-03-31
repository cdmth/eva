import { Router, Request, Response } from 'express'
import { jwtMiddleWare } from './auth/auth-services'

import graphqlRoutes from './graphql'
import authRoutes from './auth'

const routes = Router()

routes.use('/auth', authRoutes)
routes.use('/graphql', graphqlRoutes)
routes.use('/hello', jwtMiddleWare, (req: Request, res: Response) => {
  res.send("If you see this, it means you logged!")
})

export default routes