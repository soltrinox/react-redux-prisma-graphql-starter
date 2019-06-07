import config from '@packages/config'

export const endpoint = {
  development: {
    http: `http://localhost:${config.backend.port}/${
      config.backend.graphqlEndpoint
    }`,
    ws: `ws://localhost:${config.backend.port}/${
      config.backend.graphqlEndpoint
    }`
  },
  production: {
    http: `https://${window.location.host}:${config.backend.port}/${
      config.backend.graphqlEndpoint
    }`,
    ws: `wss://${window.location.host}:${config.backend.port}/${
      config.backend.graphqlEndpoint
    }`
  }
}
