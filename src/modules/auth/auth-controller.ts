import AuthServices from './auth-services'
import { Request, Response } from 'express'

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await AuthServices.register(req.body)

    return res.status(200).json(user)
  } catch (err) {
    return res.status(400).json({ error: err.message ? err.message : String(err) })
  }
}