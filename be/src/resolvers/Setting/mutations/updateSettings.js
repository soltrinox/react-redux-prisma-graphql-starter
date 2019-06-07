import {hasAccess} from '../../helpers'

export default async function(parent, args, ctx, info) {
  if (!hasAccess(ctx.req.user, info.fieldName)) {
    throw new Error('Permission denied.')
  }

  for (const setting of args.data) {
    const settingType = await ctx.db.query.setting(
      {
        where: {key: setting.key}
      },
      '{type}'
    )
    if (!settingType) {
      throw new Error(`Missing property ${setting.key}`)
    }
    try {
      typeValidation(setting, settingType.type)
      if (setting.key === 'competition') {
        const competition = await ctx.db.query.competition({
          where: {id: setting.value}
        })
        if (!competition) {
          throw new Error(`Couldn't find competition with ID: ${setting.value}`)
        }
      }
    } catch (e) {
      throw e
    }
    await ctx.db.mutation.updateSetting({
      data: {
        key: setting.key,
        value: setting.value
      },
      where: {
        key: setting.key
      }
    })
  }

  return {message: 'Settings succesfully updated!'}
}

function typeValidation(setting, type) {
  switch (type) {
    case 'Boolean': {
      const value = setting.value.toLowerCase()
      if (value !== 'true' && value !== 'false') {
        throw new Error(`Invalid value ${value} for type Boolean`)
      }
      break
    }
    case 'String': {
      break
    }
    default: {
      throw new Error(`Unsupported settings type ${type}`)
    }
  }
}
