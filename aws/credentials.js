const axios = require("axios")
let result
;(async () => {
  result = await axios.get("http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-instance-full-access-s3-feeco-created-role")
  console.log(result)
  return result
})()

module.exports = result
