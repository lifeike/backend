const { S3Client } = require("@aws-sdk/client-s3")
const credentials = require("./credentials")
console.log(credentials)

credentials.then((res) => {
  let s3 = new S3Client({
    region: "ca-central-1",
    credentials: {
      accessKeyId: res.data.AWS_ACCESS_KEY,
      secretAccessKey: res.data.AWS_SECRET_KEY,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
  })

  module.exports = s3
})
