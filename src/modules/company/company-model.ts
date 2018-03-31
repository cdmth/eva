import { Document, Schema, model  } from 'mongoose'

interface ICompany extends Document {
  name: String,
  description: String
}

export const CompanySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  }
},
{
  timestamps: true
}
);

const Company = model<ICompany>('Company', CompanySchema)

export default Company