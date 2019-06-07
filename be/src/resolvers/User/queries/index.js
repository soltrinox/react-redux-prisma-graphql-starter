import {hasAccess, isAdmin} from '../../helpers'

export default {
  user(parent, args, ctx, info) {
    if (!ctx.req.userId) {
      throw new Error('Permission Denied')
    }

    info = isAdmin(ctx.req.user)
      ? info
      : '{id, name, username, email, invitation, verified, score, status, permissions}}'

    return ctx.db.query.user(
      {
        where: {id: ctx.req.userId}
      },
      info
    )
  },
  users(parent, args, ctx, info) {
    if (!hasAccess(ctx.req.user, info.fieldName)) {
      throw new Error('Permission denied.')
    }
    return ctx.db.query.users(args, info)
  }
}
