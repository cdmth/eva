import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './estate-resolvers'

const typeDefs = `
  scalar Date

  type Status {
    message: String!
  }

  type schema {
    query: Query,
    mutation: Mutation
  }

  type Query {
    estate(_id: ID!): Estate
    estates: [Estate]
  }

  type Estate {
    _id: ID
    city: String
    zipCode: Int
    streetName: String
    streetNumber: Int
    latitude: String
    longitude: String
    price: Int
    description: String
    createdAt: Date
    updatedAt: Date
  }

  type Mutation {
    createEstate(
      city: String, 
      zipCode: Int, 
      streetName: String,
      streetNumber: Int,
      price: Int,
      description: String
    ): Estate

    updateEstate(
      _id: ID!,
      city: String, 
      zipCode: Int, 
      streetName: String,
      streetNumber: Int,
      price: Int,
      description: String
    ): Estate

    deleteEstate(_id: ID!): Status
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema