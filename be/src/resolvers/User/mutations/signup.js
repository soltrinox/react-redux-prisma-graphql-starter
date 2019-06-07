import {promisify} from 'util'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {randomBytes} from 'crypto'
import {ApolloError, AuthenticationError} from 'apollo-server-express'

import pubsub from '../../../pubsub'
import config from '@packages/config'
import {UserMailer} from '@local/mailer'

export default async function(parent, args, ctx, info) {
  args.email = args.email.toLowerCase()

  const password = await bcrypt.hash(args.password, 10)
  const asyncRandomBytes = promisify(randomBytes)
  const verificationToken = (await asyncRandomBytes(20)).toString('hex')
  const verificationTokenExpiry = Date.now() + 1000 * 60 * 60 * 24 * 365
  const username = args.username || 'User' + Date.now()

  let user = null

  try {
    const settings = await ctx.db.query.settings({
      where: {key_in: ['registrationsEnabled', 'invitationsOnly']}
    })
    const registrationsEnabled = settings.find(
      s => s.key === 'registrationsEnabled'
    )
    const invitationsOnly = settings.find(s => s.key === 'invitationsOnly')

    if (registrationsEnabled.value.toLowerCase() === 'false') {
      throw new ApolloError('Registration is disabled!')
    }

    if (invitationsOnly.value.toLowerCase() === 'true') {
      user = await handleInvitationOnly(args, ctx, username, password, info)
    } else {
      user = await ctx.db.mutation.createUser(
        {
          data: {
            ...args,
            password,
            username,
            verificationToken,
            verificationTokenExpiry,
            status: 'ACTIVE',
            permissions: {set: ['USER']}
          }
        },
        info
      )
    }
  } catch (err) {
    throw err
  }

  if (!user) {
    throw new ApolloError('Failed to create user!')
  }
  const token = jwt.sign({userId: user.id}, config.backend.jwtSecret)
  ctx.res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 2
  })

  await UserMailer.sendVerificationEmail(user, verificationToken)

  return user
}

async function handleInvitationOnly(args, ctx, username, password, info) {
  let user

  if (!args.invitation) {
    throw new ApolloError('Missing invitation Code.')
  }

  user = await ctx.db.query.user(
    {where: {invitation: args.invitation}},
    '{id,status}'
  )

  if (!user) {
    throw new AuthenticationError('Invitation code is invalid!')
  }

  if (user.status === 'ACTIVE') {
    throw new ApolloError('Account already activated!')
  }

  let userExists = await ctx.db.query.user({
    where: {username: args.username}
  })

  if (userExists) {
    throw new ApolloError('Username already in use.')
  }

  userExists = await ctx.db.query.user({where: {email: args.email}})

  if (userExists) {
    throw new ApolloError('Email already in use.')
  }

  user = await ctx.db.mutation.updateUser(
    {
      data: {
        password,
        username,
        email: args.email,
        status: 'ACTIVE'
      },
      where: {
        id: user.id
      }
    },
    info
  )

  return user
}
