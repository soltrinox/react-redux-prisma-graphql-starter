import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import express from 'express'
import fs from 'fs'
import cors from 'cors'
import http from 'http'
import https from 'https'
import helmet from 'helmet'

import config from '@packages/config'
import db from '@local/prisma'

import createApolloServer from './server'

const server = createApolloServer()
const app = express()

app.use(helmet())
app.use(cookieParser())

const whitelist = [config.url.frontend, config.url.playground]

const corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.includes(origin) || !origin || origin === 'null') {
      callback(null, true)
    } else {
      callback(new Error(`Not allowed by CORS - ${origin}`))
    }
  }
}

app.use(cors(corsOptions))
app.use(express.static('public'))

app.use((req, res, next) => {
  const {token} = req.cookies
  if (token) {
    try {
      const {userId} = jwt.verify(token, config.backend.jwtSecret)
      req.userId = userId
    } catch (err) {
      if (err.message === 'invalid signature') {
        res.clearCookie('token')
      }
    }
  }
  next()
})

app.use(async (req, res, next) => {
  if (!req.userId) return next()

  try {
    var user = await db.query.user(
      {where: {id: req.userId}},
      '{ id, password, permissions, email, name }'
    )
  } catch (err) {
    console.log(err)
  }
  req.user = user
  next()
})

server.applyMiddleware({
  app,
  cors: corsOptions
})

let httpServer
if (process.env.NODE_ENV === 'production') {
  httpServer = https.createServer(
    {
      key: fs.readFileSync(
        `${process.cwd()}/letsencrypt/live/${config.domain}/privkey.pem`,
        'utf8'
      ),
      cert: fs.readFileSync(
        `${process.cwd()}/letsencrypt/live/${config.domain}/cert.pem`,
        'utf8'
      )
    },
    app
  )
} else {
  httpServer = http.createServer(app)
}

server.installSubscriptionHandlers(httpServer)

httpServer.listen({port: config.backend.port}, () => {
  console.log(`🚀 Server ready at http://localhost:4444${server.graphqlPath}`)
  console.log(
    `🚀 Subscriptions ready at ws://localhost:4444${server.subscriptionsPath}`
  )
})
