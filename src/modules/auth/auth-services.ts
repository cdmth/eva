import AuthModel from './auth-model'

class AuthServices {
  register({ email, password }: { email: string, password: string }): void {
    if(!email) {
      throw new Error('email_required')
    } else if(!password) {
      throw new Error('password_required')
    }

    try {
      return AuthModel.create({ email, password })
    } catch (err) {
      throw err
    }
  }
}

export default new AuthServices