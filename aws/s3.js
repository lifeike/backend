const { S3Client } = require("@aws-sdk/client-s3")

let credentials
;(async () => {
  let result = await require("./credentials")
  credentials = result.data
  console.log("1")
})()

console.log("2")
let s3 = new S3Client({
  region: "ca-central-1",
  // credentials: {
  //   accessKeyId: credentials.AWS_ACCESS_KEY,
  //   secretAccessKey: credentials.AWS_SECRET_KEY,
  // },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
})

console.log("3")
module.exports = s3
