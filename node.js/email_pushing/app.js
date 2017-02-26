const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,

    // use TLS
    secure: true,
    auth: {
        user: 'barrior@qq.com',
        pass: 'mypassword'
    }
});

// Message configuration, look at the following:
// https://nodemailer.com/message/
// http://blog.fens.me/nodejs-email-nodemailer/

// setup email data with unicode symbols
let mailOptions = {
    from: 'name: Barrior敬上 <barrior@qq.com>', // sender address
    to: 'suc907@qq.com, barrior2017@gmail.com', // list of receivers
    subject: 'The subject or title',
    html: `<b>This is the content with HTML.</b>`
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('info: ', info);
    console.log('Message %s sent: %s', info.messageId, info.response);
});