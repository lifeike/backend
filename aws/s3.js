const { S3Client } = require("@aws-sdk/client-s3")
const credentialsPromise = require("./credentials")

let s3

credentialsPromise.then((credentials) => {
  console.log("2")
  s3 = new S3Client({
    region: "ca-central-1",
    credentials: {
      accessKeyId: credentials.AWS_ACCESS_KEY,
      secretAccessKey: credentials.AWS_SECRET_KEY,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
  })
})

console.log("1")
module.exports = s3
