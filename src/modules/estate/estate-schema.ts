const estateSchema = `
  scalar Date

  type Status {
    message: String!
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

  type schema {
    query: Query,
    mutation: Mutation
  }

  type Query {
    estate(_id: ID!): Estate
    estates: [Estate]
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

export default estateSchema