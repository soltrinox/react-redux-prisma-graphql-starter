module.exports = function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(() => resolve('called'), timeout)
  })
}
