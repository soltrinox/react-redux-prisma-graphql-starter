module.exports = function(a, b) {
  return Math.abs(new Date(a).getHours() - new Date(b).getHours()) >= 1
}
