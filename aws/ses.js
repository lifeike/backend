const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses")
const sesClient = new SESClient({
  region: "ca-central-1",
  credentials: {
    accessKeyId: "AKIARBXBS6257TGZ5IXS",
    secretAccessKey: "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",
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

//send verification to new register user
const sendEmailCommand = createSendEmailCommand(req.body.email, "lifeike67@gmail.com")
