const nodemailer = require('nodemailer')

const sendMail = async ({ email, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
      },
    })
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      text: text,
    }
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400).send({ error: 'Failed to send email' })
      } else {
        return res.send({ message: 'Email sent successfully' })
      }
    })
  } catch (err) {
    return err
  }
}
