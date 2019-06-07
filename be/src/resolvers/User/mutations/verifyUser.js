export default async function(parent, args, ctx, info) {
  if (!args.verificationToken) {
    throw new Error('Verification token missing.')
  }

  const [user] = await ctx.db.query.users({
    where: {
      verificationToken: args.verificationToken,
      verificationTokenExpiry_gte: Date.now() - 1000 * 60 * 60 * 24 * 365
    }
  })

  if (!user) {
    throw new Error('This token is either invalid or expired.')
  }

  const updatedUser = await ctx.db.mutation.updateUser({
    where: {email: user.email},
    data: {
      verified: true
    }
  })

  return {message: 'Done'}
}
