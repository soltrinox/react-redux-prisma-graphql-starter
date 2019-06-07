module.exports = {
  prisma: {
    endpoint: 'https://eu1.prisma.sh/petros-kyriakou-05aa74/rrpq-starter/dev',
    secret: ''
  },
  redis: {},
  backend: {
    port: '4444',
    jwtSecret: 'jwtsecret123',
    graphqlEndpoint: 'graphql'
  },
  url: {frontend: 'http://localhost:8000', playground: 'http://localhost:4444'},
  sendgrid: {apiKey: ''}
}
