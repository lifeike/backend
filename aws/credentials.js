const axios = require("axios")
module.exports = axios.get("http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-instance-full-access-s3-feeco-created-role").then((res) => {
  return () => res.data
})
