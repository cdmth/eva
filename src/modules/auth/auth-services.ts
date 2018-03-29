import Auth from './auth-model'
import * as jwt from 'jsonwebtoken'
import { authLocal, authJWT } from './passport'
import { Request, Response } from 'express'
import { resetPasswordMail } from '../mailer/mailer';


export const register = ({ email, password }:{ email: string, password: string}) => {
  if(!email)
    throw new Error('email_required')
  else if(!password)
    throw new Error('password_required')

  try {
    return Auth.create({ email, password })
  } catch (err) {
    throw err
  }
}

export const updateAuth = async (
  { authorization }:{ authorization: string},
  { email, password }:{ email: string, password: string }) => {

  if(!email && !password)
    throw new Error('no_parameters')

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

export const reset = async ({ email }:{ email: string }) => {
  if(!email)
    throw new Error('email_required')

  try {
    let user = await Auth.findOne({ email })

    if(!user)
      throw new Error("email_not_found")

    const {token, time} = user.generateResetToken()

    user.resetToken = token
    user.resetTokenTime = time
    user.save()

    await resetPasswordMail({email: email, resetToken: user.resetToken})
    
    return "token_generated"
  } catch (err) {
    throw new Error(err)
  }
}

export const recoverPassword = async ( token: string, { password }:{ password: string } ) => {
  if(!token || !password)
    throw new Error("invalid_token")

  try {
    const user = await Auth.findOne({"resetToken": token})

    if(!user || Date.now() - user.resetTokenTime > 24*60*60*1000) 
      throw new Error("invalid_token")

    user.password = password
    user.resetToken = undefined
    user.resetTokenTime = undefined
    user.save()

    return "password_changed"
  } catch (err) {
    throw new Error(err)
  }
}

export const loginMiddleWare = (req: Request, res: Response, next: any) => 
  authLocal(req, res, next)

export const jwtMiddleWare = (req: Request, res: Response, next: any) => 
  authJWT(req, res, next)
