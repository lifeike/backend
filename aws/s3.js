const { S3Client } = require("@aws-sdk/client-s3")
const result = await require("./credentials")
console.log(result)

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

module.exports = s3
