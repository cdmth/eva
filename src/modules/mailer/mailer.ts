const api_key = 'key-ad6bca7ff55275c176baf06f731cda4b'
const domain = 'sandbox59747e4505a34471beca3b9096784f92.mailgun.org'
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

export const signUpMail = async (email) => {
  let data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'eva.dev.mailer@gmail.com',
    subject: 'Hello',
    text: `Thank you for registering ${email}`
  }

  try {
    if(process.env.NODE_ENV === 'development') {
      const mail = await (mailgun.messages().send(data))
      console.log("Sent register mail")
    } else {
      return true
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const resetPasswordMail = async (creds) => {
  let data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'eva.dev.mailer@gmail.com',
    subject: 'Hello',
    text: `Hello, here is your reset token for ${creds.email}: ${creds.resetToken}`
  }

  try {
    if(process.env.NODE_ENV === 'development') {
      const mail = await (mailgun.messages().send(data))
      console.log("Sent register mail")
    } else {
      return true
    }
  } catch (err) {
    throw new Error(err)
  }
}