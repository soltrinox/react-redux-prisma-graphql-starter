module.exports = function(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') {
    throw new Error('Dates must be given as strings')
  }

  const tzA = a.substring(a.length - 5, a.length)
  const tzB = b.substring(b.length - 5, b.length)

  return tzA !== tzB
}
