import { S3Client } from "@aws-sdk/client-s3"
import credentials from "./credentials"

let s3 = new S3Client({
  region: "ca-central-1",
  credentials: {
    accessKeyId: credentials.AWS_ACCESS_KEY,
    secretAccessKey: credentials.AWS_SECRET_KEY,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
})

export default s3
