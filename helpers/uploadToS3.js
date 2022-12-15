import * as AWS from "aws-sdk"

const AWSAccessKeyId = "..."
const AWSSecretKey = "..."

export function uploadToS3(imageStr, filename) {
  const s3 = new AWS.S3({
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey,
  })

  return new Promise((resolve, reject) => {
    const buf = new Buffer(imageStr.replace(/^data:image\/\w+;base64,/, ""), "base64")
    const data = {
      Bucket: "my-bucket",
      Key: "uploads/" + filename,
      Body: buf,
      ContentEncoding: "base64",
      ContentType: "image/jpeg",
    }
    s3.putObject(data, function (err) {
      if (err) {
        reject(err)
      }
      const url = `https://my-bucket.s3.us-east-2.amazonaws.com/uploads/${filename}`
      resolve(url)
    })
  })
}
