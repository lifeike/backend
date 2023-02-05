const fs = require("fs")
const homedir = require("os").homedir()
// console.log(homedir)

const credentials = fs.readFileSync(`${homedir}/.aws-credentials`, "utf8").toString().split("\n")
console.log(credentials)

module.exports = {
  AWS_ACCESS_KEY: process.env.aws_access_key,
  AWS_SECRET_KEY: process.env.aws_secret_access_key,
}
