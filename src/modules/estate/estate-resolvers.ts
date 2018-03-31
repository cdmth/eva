import Estate from './estate-model';

import * as GraphqlDate from 'graphql-date'

const estateResolvers = {
  Date: GraphqlDate,
  Query: {
    estate: (_, { _id }) => Estate.findById(_id),
    estates: () => Estate.find({}),
    companyEstates: (_, { _id }) => Estate.find({company: _id})
  },
  Mutation: {
    createEstate: (_, args) => Estate.create(args),
    updateEstate: (_, {_id, ...rest}) => Estate.findByIdAndUpdate(_id, rest, { new: true }),
    deleteEstate: async (_, { _id }) => {
      try {
        await Estate.findByIdAndRemove(_id)
        return {
          message: "Deleted succesfully"
        }
      } catch (err) {
        throw Error(err)
      }
    }
  }
};

export default estateResolvers