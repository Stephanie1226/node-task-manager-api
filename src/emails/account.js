const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'a611289557@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`
  })
}

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'a611289557@gmail.com',
    subject: `Goodbye ${name}, we hope to see you in the future`,
    text: `Goodbye, ${name}. We are sad that you choose to go. We hope you to see you in the future`,
    html:'<h1>Hi hi hi this is a test for html Hahahahah<h1>'
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}