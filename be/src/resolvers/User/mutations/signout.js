export default function(parent, args, ctx, info) {
  ctx.res.clearCookie('token')
  return {message: 'GoodBye!'}
}
