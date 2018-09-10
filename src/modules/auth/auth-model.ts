import { Document, Schema, model  } from 'mongoose'
import { hashSync, compareSync } from 'bcrypt-nodejs'
import * as crypto from 'crypto'
import * as mailer from '../mailer/mailer'
import * as validator from 'validator'
import * as uniqueValidator from 'mongoose-unique-validator'
import * as jwt from 'jsonwebtoken'

import constants from '../../config/constants'

interface IAuth extends Document {
  authenticateUser(password: string): boolean
  generateResetToken(): any
  resetToken: string
  resetTokenTime: number
  email: string
  password: string
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
  },
  resetToken: {
    type: String,
    trim: true
  },
  resetTokenTime: {
    type: Number,
    trim: true
  }
});

AuthSchema.plugin(uniqueValidator, {
  message: "Email already taken"
})

AuthSchema.pre('save', function(next) {
  if(this.isModified('password')) {
    //@ts-ignore
    this.password = this._hashPassword(this.password)
    return next()
  }

  return next()
})

AuthSchema.methods = {
  _hashPassword(password: string): void {
    return hashSync(password)
  },

  authenticateUser(password: string): boolean {
    return compareSync(password, this.password)
  },

  // Overriding toJSON method
  toJSON(): object {
    return {
      _id: this._id,
      email: this.email
    }
  },

  toAuthJSON(): object {
    return {
      token: this.createToken(),
      ...this.toJSON()
    }
  },

  createToken() {
    return jwt.sign({ _id: this._id }, constants.JWT_SECRET)
  },

  generateResetToken() {
    return {
      token: crypto.randomBytes(32).toString('hex'),
      time: Date.now()
    }
  }
}

const Auth = model<IAuth>('Auth', AuthSchema)

export default Auth