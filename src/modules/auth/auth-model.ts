import { Schema, model } from 'mongoose'

const AuthSchema: Schema = new Schema({
  email: String,
  password: String,
})

export default model('Auth', AuthSchema) 