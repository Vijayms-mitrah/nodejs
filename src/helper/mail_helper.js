const nodeMailer = require('nodemailer')

const sender = nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user:"vijayprasanth.ms@mitrahsoft.com",
        pass:"vmak bhah uagk lcgh"
    }
})

const mailOption = {
    from: 'vijayprasanth.ms@mitrahsoft.com',
    to: "kowsalkannan.m@mitrahsoft.com",
    subject: "Testing purpose mail",
    html:'<div>this is a first message</div>'
}

module.exports = {sender, mailOption}