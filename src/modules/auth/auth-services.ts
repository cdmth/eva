import AuthSchema from './auth-model'
import { model } from 'mongoose'

export const register = ({ email, password }) => {
  if(!email) {
    throw new Error('email_required')
  } else if(!password) {
    throw new Error('password_required')
  }

  try {
    return model('Auth', AuthSchema)
      .create({ email, password })
  } catch (err) {
    throw err
  }
}