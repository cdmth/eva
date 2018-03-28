import { Request, Response } from 'express'
import { register } from './auth-services'

export const signup = 
  async (req: Request, res: Response) => {
  try {
    const user = await (register(req.body))
    return res.status(200).json(user)
  } catch (err) {
    return res.status(400)
      .json({ error: err.message ? err.message : String(err) })
  }
}

export const login = (req: Request, res: Response, next: any) => {
  res.status(200).json(req.user.toAuthJSON())

  return next()
}