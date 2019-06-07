import bcrypt from 'bcryptjs'

import {UserMailer} from '@local/mailer'

export default async function(parent, args, ctx, info) {
  const {
    id,
    currentPassword,
    newPassword,
    newPasswordConfirm,
    ...restArgs
  } = args

  if (ctx.req.user.id !== id) {
    throw new Error('You are not authorised to carry this action.')
  }

  if (currentPassword) {
    const valid = await bcrypt.compare(currentPassword, ctx.req.user.password)

    if (!valid) {
      throw new Error('Invalid current password provided')
    }
  }

  if (currentPassword && (!newPassword || !newPasswordConfirm)) {
    throw new Error('Passwords do not match')
  }

  if (newPassword !== newPasswordConfirm) {
    throw new Error('Passwords do not match')
  }

  restArgs.email = restArgs.email.toLowerCase()

  const password = newPassword
    ? await bcrypt.hash(newPassword, 10)
    : ctx.req.user.password

  const user = await ctx.db.mutation.updateUser(
    {
      where: {
        id
      },
      data: {
        ...restArgs,
        password
      }
    },
    '{ name email}'
  )

  await UserMailer.sendPasswordChangedEmail(user)

  if (newPassword) {
    return {message: 'Account updated', signal: 'REDIRECT'}
  }

  return {message: 'Success', signal: null}
}
