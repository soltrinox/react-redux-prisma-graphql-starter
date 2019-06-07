const moment = require('moment')

module.exports = function(date) {
  return (
    moment(date)
      .startOf('day')
      .unix() ===
    moment()
      .startOf('day')
      .unix()
  )
}
