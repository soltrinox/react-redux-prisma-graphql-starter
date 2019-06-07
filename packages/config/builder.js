const config = require('./src/index')
const fs = require('fs')

const parsedFile = `
module.exports = ${JSON.stringify(config)}
`
const buildDir = __dirname + '/build'

if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir)
}

fs.writeFile(`${buildDir}/index.js`, parsedFile, function(err) {
  if (err) {
    return console.log(err)
  }

  console.log('The file was saved!')
})
