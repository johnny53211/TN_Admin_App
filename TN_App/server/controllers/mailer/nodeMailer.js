const nodemailer = require('nodemailer');
const utils = require('../utils/utils');

const mailController = {
    sendMail: async (options = {}) => {
        let { to, content } = options;
        try {
            const transporter = await mailController.getTransporter();
            const info = await transporter.sendMail({
                from: 'johnson02032001@gmail.com',
                to: to,
                subject: "Events",
                html: content,
            });
            return info;
            // console.log('Email sent:', info.response);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    },
    getTransporter: async (content) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: 'a09216214@gmail.com',
                    pass: 'ohibdxcmwapwcwsv'
                },
                tls: { rejectUnauthorized: false }
            });
            return transporter;
        } catch (error) {
            return error;
        }
    },
};

module.exports = mailController;
