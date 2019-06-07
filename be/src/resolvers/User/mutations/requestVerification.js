import {promisify} from 'util'
import {randomBytes} from 'crypto'

import {UserMailer} from '@local/mailer'

export default async function(parent, args, ctx, info) {
  const user = await ctx.db.query.user({where: {email: args.email}})

  if (!user) {
    throw new Error(`User not found for email ${args.email}`)
  }

  const asyncRandomBytes = promisify(randomBytes)
  const verificationToken = (await asyncRandomBytes(20)).toString('hex')
  const verificationTokenExpiry = Date.now() + 1000 * 60 * 60 * 24 * 365
  const res = await ctx.db.mutation.updateUser({
    where: {email: args.email},
    data: {verificationToken, verificationTokenExpiry}
  })

  await UserMailer.sendVerificationEmail(user, verificationToken)

  return {message: 'Thanks'}
}
