import * as passport from 'passport'
import * as LocalStrategy from 'passport-local'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'

import Auth from './auth-model'
import constants from '../../config/constants'

const localOpts = {
  usernameField: 'email'
}

const localLogin = 
  new LocalStrategy(localOpts, async (email: string, password: string, done: any) => {

  try {
    const user = await Auth.findOne({ email })

    if(!user) {
      return done(null, false)
    } else if (!user.authenticateUser(password)) {
      return done(null, false)
    }

    done(null, user)
    
  } catch (err) {
    return done(err, false)
  }
})

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: constants.JWT_SECRET
}

const jwtLogin =
  new JWTStrategy(jwtOpts, async (payload, done) => {
    try {
      const user = await Auth.findById(payload._id)

      if(!user) {
        return done(null, false)
      }

      return done(null, user)

    } catch (err) {
      return done(err, false)
    }
  })

  passport.use(localLogin)
  passport.use(jwtLogin)

export const authLocal = passport.authenticate('local', { session: false })
export const authJWT = passport.authenticate('jwt', { session: false })