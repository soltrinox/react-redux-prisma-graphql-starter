import {ApolloServer, gql, makeExecutableSchema} from 'apollo-server-express'
import {importSchema} from 'graphql-import'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import {Subscription} from './resolvers/Subscription'
import prisma from '@local/prisma'
import {addMiddleware} from 'graphql-add-middleware'

const typeDefs = gql`
  ${importSchema('./src/schema.graphql')}
`

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Mutation,
    Query
    // Subscription
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
})

// addMiddleware(schema, async function (root, args, ctx, info, next) {
//   return await next()
// })

function createApolloServer() {
  return new ApolloServer({
    schema,
    subscriptions: {
      onConnect: (connectionParams, webSocket, context) => {
        console.log('WS client Connected')
      },
      onDisconnect: (webSocket, context) => {
        console.log('WS client Disconnected')
      }
    },
    context: req => ({...req, db: prisma})
  })
}

module.exports = createApolloServer
