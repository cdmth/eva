import { Router } from 'express'
import { jwtMiddleWare } from '../auth/auth-services'

import { makeExecutableSchema } from 'graphql-tools'
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import { graphqlExpress } from 'apollo-server-express'

import rootSchema from './root-schema'
import { companySchema, companyResolvers } from '../company/'

const routes = Router()

const allSchemas = [
  rootSchema,
  companySchema
];

const allResolvers = [
  companyResolvers
]
 
const typeDefs = mergeTypes(allSchemas, { all: true });
const resolvers = mergeResolvers(allResolvers, { all: true });

const schema = makeExecutableSchema({ typeDefs, resolvers });

const estateEndpoint = graphqlExpress({ schema })

routes.use('/', estateEndpoint)

export default routes
