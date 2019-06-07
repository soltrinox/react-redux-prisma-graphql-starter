export default async function(parent, args, ctx, info) {
  if (
    args.id !== ctx.req.user.id &&
    ctx.req.user.permissions.includes('ADMIN')
  ) {
    throw new Error('You do not have permission to carry this action')
  }

  return await ctx.db.mutation.deleteUser({
    where: {
      id: args.id
    }
  })
}
