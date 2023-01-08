const axios = require("axios")

let result
const getCredentials = async () => {
  result = await axios.get("http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-instance-full-access-s3-feeco-created-role")
  console.log("test")
  console.log(result)
  console.log("test")
  return result
}
getCredentials()

module.exports = result
