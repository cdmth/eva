import { Router } from 'express'
import { jwtMiddleWare } from '../auth/auth-services'

import { makeExecutableSchema } from 'graphql-tools'
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import { graphqlExpress } from 'apollo-server-express'

import { estateSchema, estateResolver } from '../estate/'

const routes = Router()

const allSchemas = [
  estateSchema
];

const allResolvers = [
  estateResolver
]
 
const typeDefs = mergeTypes(allSchemas, { all: true });
const resolvers = mergeResolvers(allResolvers, { all: true });

const schema = makeExecutableSchema({ typeDefs, resolvers });

const estateEndpoint = graphqlExpress({ schema })

routes.use('/', estateEndpoint)

export default routes
