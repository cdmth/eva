import * as passport from 'passport'
import * as LocalStrategy from 'passport-local'

import Auth from './auth-model'

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

passport.use(localLogin)

export const authLocal = passport.authenticate('local', { session: false })