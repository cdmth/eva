import Auth from './auth-model'
import * as jwt from 'jsonwebtoken'
import { authLocal, authJWT } from './passport'
import { Request, Response } from 'express'


export const register = ({ email, password }:{ email: string, password: string}) => {
  if(!email) {
    throw new Error('email_required')
  } else if(!password) {
    throw new Error('password_required')
  }

  try {
    return Auth.create({ email, password })
  } catch (err) {
    throw err
  }
}

export const updateAuth = async (
  { authorization }:{ authorization: string},
  { email, password }:{ email: string, password: string }) => {

  if(!email && !password) {
    throw new Error('no_parameters')
  }

  let payload: any = await jwt.decode(authorization.substring(4))

  try {
    let user: any = await Auth.findOne({_id: payload._id})
      .catch((err) => {
        throw new Error(err)
      })

    if(!!email)
      user.email = email
    if(!!password)
      user.password = password

    return user.save()
  } catch (err) {
      throw new Error(err)
  }
}

export const loginMiddleWare = (req: Request, res: Response, next: any) => {
  return authLocal(req, res, next)
}

export const jwtMiddleWare = (req: Request, res: Response, next: any) => {
  return authJWT(req, res, next)
}