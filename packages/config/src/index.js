const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')

const dotenvFilePath = path.resolve(__dirname, `../${process.env.NODE_ENV}.env`)

if (fs.existsSync(dotenvFilePath)) {
  dotenv.config({
    path: dotenvFilePath,
    encoding: 'utf8'
  })
}

module.exports = {
  prisma: {
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  backend: {
    port: process.env.BACKEND_PORT,
    jwtSecret: process.env.BACKEND_JWT_SECRET,
    graphqlEndpoint: process.env.BACKEND_GRAPHQL_ENDPOINT
  },
  url: {
    frontend: process.env.FRONTEND_URL,
    playground: process.env.PLAYGROUND_URL
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY
  }
}
