import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import credentials from "./credentials"
import { v4 as uuidv4 } from "uuid"

const sesClient = new SESClient({
  region: "ca-central-1",
  credentials: {
    accessKeyId: credentials.AWS_ACCESS_KEY,
    secretAccessKey: credentials.AWS_SECRET_KEY,
  },
})
const createSendEmailCommand = (toAddress, fromAddress) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        toAddress,
        /* more To-email addresses */
      ],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `verification code ${uuidv4()}`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "EMAIL_SUBJECT",
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [],
  })
}

export default { sesClient, createSendEmailCommand }
