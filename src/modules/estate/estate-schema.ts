const estateSchema = `
  type Status {
    message: String!
  }

  type Estate {
    _id: ID
    city: String
    company: String
    zipCode: String
    streetName: String
    streetNumber: Int
    latitude: String
    longitude: String
    price: Int
    description: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    estate(_id: ID!): Estate
    estates: [Estate]
    companyEstates(_id: ID!): [Estate]
  }

  type Mutation {
    createEstate(
      city: String, 
      zipCode: String, 
      streetName: String,
      streetNumber: Int,
      price: Int,
      description: String
    ): Estate

    updateEstate(
      _id: ID!,
      city: String, 
      zipCode: String, 
      streetName: String,
      streetNumber: Int,
      price: Int,
      description: String
    ): Estate

    deleteEstate(_id: ID!): Status
}
`

export default estateSchema