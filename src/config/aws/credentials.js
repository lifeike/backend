import fs from "fs"
import homedir  from("os")
// console.log(homedir)

const credentials = fs.readFileSync(`${homedir}/.aws-credentials`, "utf8").toString().split("\n")
console.log(credentials)

export default {
  AWS_ACCESS_KEY: credentials[0],
  AWS_SECRET_KEY: credentials[1],
}
