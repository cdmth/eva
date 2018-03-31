import Company from './company-model';

import * as GraphqlDate from 'graphql-date'

const companyResolvers = {
  Date: GraphqlDate,
  Query: {
    company: (_, { _id }) => Company.findById(_id),
    companies: () => Company.find({})
  },
  Mutation: {
    createCompany: (_, args) => Company.create(args),
    updateCompany: (_, {_id, ...rest}) => Company.findByIdAndUpdate(_id, rest, { new: true }),
    deleteCompany: async (_, { _id }) => {
      try {
        await Company.findByIdAndRemove(_id)
        return {
          message: "Deleted succesfully"
        }
      } catch (err) {
        throw Error(err)
      }
    }
  }
};

export default companyResolvers