import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '@packages/config'

export default async function(parent, {email, password}, ctx, info) {
  const user = await ctx.db.query.user(
    {
      where: {
        email
      }
    },
    '{id email permissions name username password status}'
  )

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    throw new Error('Invalid email or password')
  }
  if (user.status !== 'ACTIVE') {
    throw new Error('Your account is not active')
  }

  const token = jwt.sign({userId: user.id}, config.backend.jwtSecret)

  ctx.res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 2
  })
  return user
}
