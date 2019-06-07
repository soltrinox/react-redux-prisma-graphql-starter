import {promisify} from 'util'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {randomBytes} from 'crypto'
import {AuthenticationError} from 'apollo-server-express'

import {UserMailer} from '@local/mailer'
import config from '@packages/config'
import pubsub from '../../../pubsub'
import {hasAccess} from '../../helpers'

export default async function(parent, args, ctx, info) {
  if (!hasAccess(ctx.req.user, info.fieldName)) {
    throw new Error('Permission denied.')
  }

  args.email = args.email.toLowerCase()

  const password = await bcrypt.hash(Date.now() * 2, 10)

  const userExists = await ctx.db.query.user(
    {where: {email: args.email}},
    '{id}'
  )

  if (userExists) {
    throw new Error('Email is not unique')
  }

  const user = await ctx.db.mutation.createUser(
    {
      data: {
        name: `Name_${Date.now()}`,
        username: `User_${Date.now()}`,
        email: args.email,
        invitation: Date.now(),
        password,
        status: 'INACTIVE',
        permissions: {set: ['USER']}
      }
    },
    info
  )

  await UserMailer.sendInvitationEmail(user)

  return user
}
