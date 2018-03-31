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
  }
},
{
  timestamps: true
}
);

const Estate = model<IEstate>('Estate', EstateSchema)

export default Estate