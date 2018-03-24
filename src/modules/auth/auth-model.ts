import * as mongoose from 'mongoose'

const AuthSchema = new mongoose.Schema({
  email: String,
  password: String,
})

export default mongoose.model('Auth', AuthSchema)