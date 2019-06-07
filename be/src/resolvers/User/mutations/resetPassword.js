import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import config from '@packages/config'
import {UserMailer} from '@local/mailer'

export default async function(parent, args, ctx, info) {
  if (args.password !== args.confirmPassword) {
    throw new Error('Passwords do not match')
  }

  const [user] = await ctx.db.query.users({
    where: {
      resetToken: args.resetToken,
      resetTokenExpiry_gte: Date.now() - 1000 * 60 * 60
    }
  })

  if (!user) {
    throw new Error('This token is either invalid or expired.')
  }

  const password = await bcrypt.hash(args.password, 10)

  const updatedUser = await ctx.db.mutation.updateUser(
    {
      where: {email: user.email},
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    },
    '{id name email}'
  )

  const token = jwt.sign({userId: updatedUser.id}, config.auth.jwtSecret)

  await UserMailer.sendPasswordChangedEmail(updatedUser)

  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 2
  })

  return updatedUser
}
