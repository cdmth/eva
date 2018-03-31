import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './estate-resolvers'

const typeDefs = `
type Query {
  estates: [Estate]
}

type Estate {
  city: String
  zipCode: Int
  streetName: String
  streetNumber: Int
  latitude: String
  longitude: String
  price: Int
  description: String
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema