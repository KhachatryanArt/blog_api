const nodemailer = require('nodemailer');
const mailConfig = require("../config/node-mailer")

class EmailService {
    static async sendEmail(email, name) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',//also tried host:'smtp.gmail.com'
            // secure: false, //also tried 'true'
            // port: 587,//also tried 25 and 465
            auth: {
                user: mailConfig.user,
                pass: mailConfig.pass,
            }
        });

        const mailConfigurations = {
            from: 'arthurxachatrayn@gmail.com',
            to: `${email}`,
            subject: 'Sending Email using Node.js',
            html: `<h2>Hi! ${name}</h2><p>  This HTML content is being send by NodeJS along with NodeMailer.</p>
                    <a href="https://www.geeksforgeeks.org/how-to-send-email-using-node-js/" style="background-color: #4CAF50;border: none;color: white;
                    padding: 10px 25px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;
                    border-radius: 8px;" target="_blank">Open App</a>`
        };

        return transporter.sendMail(mailConfigurations, function (error, info) {
            if (error) throw Error(error);
            console.log('Email Sent Successfully');
            console.log(info);
        });
    }
}

module.exports = EmailService