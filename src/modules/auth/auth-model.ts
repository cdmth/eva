import { Document, Schema, model  } from 'mongoose'
import * as validator from 'validator'
import * as uniqueValidator from 'mongoose-unique-validator'
import { hashSync, compareSync } from 'bcrypt-nodejs'

interface IAuth extends Document {
  authenticateUser(password: string): boolean
}

export const AuthSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    validate: {
      validator(email) {
        return validator.isEmail(email)
      },
      message: "{VALUE} is not valid email"
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator(password) {
        return password.length >= 6 && password.match(/\d+/g)
      },
      message: "Not valid password"
    }
  }
});

AuthSchema.plugin(uniqueValidator, {
  message: "Email already taken"
})

AuthSchema.pre('save', function(next) {
  if(this.isModified('password')) {
    this.password = this._hashPassword(this.password)
    return next()
  }

  return next()
})

AuthSchema.methods = {
  _hashPassword(password: string): string {
    return hashSync(password)
  },

  authenticateUser(password: string): boolean {
    return compareSync(password, this.password)
  }
}

const Auth = model<IAuth>('Auth', AuthSchema)

export default Auth