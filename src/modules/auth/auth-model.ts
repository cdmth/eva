import { Schema, model } from 'mongoose'

const AuthSchema = new Schema({
  email: String,
  password: String,
});

export default model('Auth', AuthSchema)