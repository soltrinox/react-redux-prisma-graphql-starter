module.exports = args => {
  const results = {}
  const pairs = Array.isArray(args) ? args : [args]

  pairs.forEach(pair => {
    const functionName = Object.keys(pair)[0]
    console.time(functionName)
    results[functionName] = pair[functionName](pair.args)
    console.timeEnd(functionName)
  })
  return results
}
