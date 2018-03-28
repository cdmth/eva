import { Schema } from 'mongoose'

const AuthSchema = new Schema({
  email: String,
  password: String,
});

export default AuthSchema