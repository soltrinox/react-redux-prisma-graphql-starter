import {hasAccess} from '../../helpers'
export default {
  setting(parent, args, ctx, info) {
    return ctx.db.query.setting(args, info)
  },
  settings(parent, args, ctx, info) {
    return ctx.db.query.settings(args, info)
  }
}
