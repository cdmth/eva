import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import schema from './estate-schema'
import estateResolvers from './estate-resolvers'

export const estateEndpoint = graphqlExpress({ schema })