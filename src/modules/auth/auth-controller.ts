import { Request, Response } from 'express'
import { register, updateAuth, reset, recoverPassword } from './auth-services'
import { resetPasswordMail } from '../mailer/mailer'

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await (register(req.body))

    return res.status(200).json(user)
  } catch (err) {
    return res.status(400)
      .json({ error: err.message ? err.message : String(err) })
  }
}

export const update = async (req: any, res: Response) => {
  try {
    const changed = await (updateAuth(req.headers, req.body))
    
    return res.status(200).json(changed)
  } catch (err) {
    return res.status(400)
      .json({ error: err.message ? err.message : String(err) })
  }
}

export const login = (req: Request, res: Response, next: any) => {
  res.status(200).json(req.user.toAuthJSON())

  return next()
}

export const forgot = async (req: Request, res: Response) => {
  try {
    const token = await (reset(req.body))

    return res.status(200).json(token)
  } catch (err) {
    return res.status(400)
      .json({ error: err.message ? err.message : String(err) })
  }
}

export const recover = async (req: Request, res: Response) => {
  try {
    const success = await (recoverPassword(req.params.token, req.body))

    return res.status(200).json({success})
  } catch (err) {
    return res.status(400)
      .json({ error: err.message ? err.message : String(err) })
  }
}