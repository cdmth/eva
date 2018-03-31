const companySchema = `
  type Status {
    message: String!
  }

  type Company {
    _id: ID
    name: String
    description: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    company(_id: ID!): Company
    companies: [Company]
  }

  type Mutation {
    createCompany(
      name: String, 
      description: String
    ): Company

    updateCompany(
      _id: ID!,
      name: String,
      description: String
    ): Company

    deleteCompany(_id: ID!): Status
}
`

export default companySchema