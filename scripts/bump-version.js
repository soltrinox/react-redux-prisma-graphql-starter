const fs = require("fs");
const moment = require("moment");
const filePath = "../version.js";

fs.writeFileSync(filePath, `module.exports = "${moment().format()}"`);
