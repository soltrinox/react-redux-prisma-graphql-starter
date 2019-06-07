import {endpoint} from './config'
import {persistCache} from 'apollo-cache-persist'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {ApolloLink, split} from 'apollo-link'
import {WebSocketLink} from 'apollo-link-ws'
import {getMainDefinition} from 'apollo-utilities'
// import {createUploadLink} from 'apollo-upload-client'

export default async function setupApollo() {
  const cache = new InMemoryCache()

  // ENABLE CACHE
  // await persistCache({
  //   cache,
  //   storage: window.localStorage,
  //   debug: true,
  //   maxSize: false
  // })

  const wsLink = new WebSocketLink({
    uri: endpoint[process.env.NODE_ENV].ws,
    options: {
      reconnect: true
    }
  })

  const httpLink = new HttpLink({
    uri: endpoint[process.env.NODE_ENV].http,
    credentials: 'include'
  })

  // const uploadLink = new createUploadLink({
  //   uri: 'http://localhost:8000/graphql'
  // })

  // const httpBasedLinks = ApolloLink.from([httpLink, uploadLink])

  // INFO: queries and mutations will go over HTTP as normal, but subscriptions will be done over the websocket transport.
  const link = split(
    ({query}) => {
      const {kind, operation} = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  )

  const client = new ApolloClient({
    cache,
    link
  })

  return client
}
