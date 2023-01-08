const axios = require("axios")

;(async function () {
  let result = await axios.get("http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-instance-full-access-s3-feeco-created-role")
  module.exports = result.data
})()
