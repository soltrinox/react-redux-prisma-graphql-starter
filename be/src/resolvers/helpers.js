const permissions = new Map([
  // user
  ['users', ['ADMIN']],
  ['inviteUser', ['ADMIN']],
  // Settings
  ['updateSettings', ['ADMIN']]
])
function hasAccess(user, action) {
  return (
    permissions.has(action) &&
    permissions
      .get(action)
      .some(permission => user.permissions.includes(permission))
  )
}
function isAdmin(user) {
  return user.permissions.includes('ADMIN')
}
export {hasAccess, isAdmin}
