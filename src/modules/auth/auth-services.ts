import Auth from './auth-model'
import { authLocal } from './passport'
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

export const loginMiddleWare = (req: Request, res: Response, next: any) => {
  return authLocal(req, res, next)
}