import { Document, Schema, model  } from 'mongoose'

interface IEstate extends Document {
  city: String,
  price: Number,
  description: String
  findAll(): any
}

export const EstateSchema = new Schema({
  city: {
    type: String,
    trim: true,
    required: true,
  },
  zipCode: {
    type: Number,
    trim: true,
  },
  streetName: {
    type: String,
    trim: true,
  },
  streetNumber: {
    type: Number,
    trim: true,
  },
  latitude: {
    type: String,
    trim: true,
  },
  longitude: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  }
});

const Estate = model<IEstate>('Estate', EstateSchema)

export default Estate