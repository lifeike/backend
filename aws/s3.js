const { S3Client } = require("@aws-sdk/client-s3")
let result = require("./credentials")()
result.then((res) => console.log(res))

let s3 = new S3Client({
  region: "ca-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
})

module.exports = s3
