import {promisify} from 'util'
import {randomBytes} from 'crypto'

import {UserMailer} from '@local/mailer'

export default async function(parent, args, ctx, info) {
  const user = await ctx.db.query.user({where: {email: args.email}})

  if (!user) {
    throw new Error(`User not found for email ${args.email}`)
  }

  const asyncRandomBytes = promisify(randomBytes)
  const resetToken = (await asyncRandomBytes(20)).toString('hex')
  const resetTokenExpiry = Date.now() + 1000 * 60 * 60
  const res = await ctx.db.mutation.updateUser({
    where: {email: args.email},
    data: {resetToken, resetTokenExpiry}
  })

  await UserMailer.sendPasswordResetEmail(user, resetToken)

  return {message: 'Thanks'}
}
