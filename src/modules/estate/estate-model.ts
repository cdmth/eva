import { Document, Schema, model  } from 'mongoose'

interface IEstate extends Document {
  city: String
  price: Number
  description: String
  zipCode: String
  streetName: String 
}

export const EstateSchema = new Schema({
  city: {
    type: String,
    trim: true,
    required: true,
  },
  company: {
    type: String
  },
  zipCode: {
    type: String,
  },
  streetName: {
    type: String,
  },
  streetNumber: {
    type: Number,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  images: [{
    src: String,
    thumbnail: String,
    description: { type: String, trim: true }
  }]
},
{
  timestamps: true
}
);

const Estate = model<IEstate>('Estate', EstateSchema)

export default Estate