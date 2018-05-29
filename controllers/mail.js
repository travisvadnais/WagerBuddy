const nodemailer = require('nodemailer');
// create reusable transporter object 
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER, // user
        pass: process.env.EMAIL_PSWD // password
    }
});

function sendMail(to, subject, bodyText, htmlText) {
    // setup email data with unicode symbols
    let mailOptions = {
        from: process.env.EMAIL_FROM, // sender address
        to: to, // list of receivers
        subject: '🍺 Your Bar Bet: ' + subject, // Subject line
        text: bodyText, // plain text body
        html: htmlText // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            //log error
            return console.log(error);
        }
        // log success
        console.log('Message sent: %s', info.messageId);
    });
}

module.exports = sendMail;