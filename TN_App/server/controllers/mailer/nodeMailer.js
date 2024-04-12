const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const mailConfig = require('./mailConfig');
const utils = require('../utils/utils');

const mailController = {
    init: async () => {
        try {
            const oAuthClient = await mailController.initClient();
        } catch (error) {
            console.error('Error initializing mail controller:', error);
        }
    },

    sendMail: async (options = {
        from: mailConfig.adminEmail,
        to: 'johnson02032001@gmail.com',
        subject: "Test",
        text: "Hi, this is a test email",
    }) => {
        try {
            const transporter = await mailController.getTransporter();
            // const info = await transporter.sendMail(options);
            // console.log('Email sent:', info.response);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    },

    getAccessToken: async (oAuthClient) => {
        try {
            const { tokens } = await oAuthClient.getAccessToken();
            return tokens;
        } catch (error) {
            console.error('Error getting access token:', error);
            throw error; // Re-throw for handling in calling function
        }
    },

    setAccessToken: async (oAuthClient) => {
        try {
            oAuthClient.setCredentials({ access_token: mailConfig.accessToken });
        } catch (error) {
            console.error('Error setting access token:', error);
            throw error; // Re-throw for handling in calling function
        }
    },

    initClient: async () => {
        return new Promise((resolve, reject) => {
            const oauth2Client = new OAuth2(
                mailConfig.clientId,
                mailConfig.clientSecret,
                'https://developers.google.com/oauthplayground'
            );
            resolve(oauth2Client);
        });
    },

    getTransporter: async () => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    type: "OAuth2",
                    clientId: '72807223771-c4fahm5o8dovjueeu1rttnu9hoapjqc3.apps.googleusercontent.com',
                    clientSecret: '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',
                },
            });

            transporter.sendMail({
                from: 'johnson02032001@gmail.com',
                to: "",
                subject: "Message",
                text: "I hope this message gets through!",
                auth: {
                    user: 'a09216214@gmail.com',
                    refreshToken: '1//04EKuCElthgwjCgYIARAAGAQSNwF-L9IrsfxVjES37rquW1dGucRvZ3DvAtu2Qkp97NLO8NO321FLsMB-YQl3LuW7R2z-9U85aYE',
                    accessToken: 'ya29.a0Ad52N3-ucnO2U4j2qFVt90GKkyt6VUr42cCWNa6N50UITePKN1-S7EG7uMVGd30z_K-OeAgS6xqo8K4S9U1JqMEn0MHDteJQfyBdXK1Q6l6fB_fPYElOBjhltT513WQnjM6Bdf0KubYjpnDywAA0YfBEuCdzAcaire-gaCgYKAdsSARASFQHGX2MiLe3u8G8oeGQidvKEe3x0CQ0171',
                },
            });
        } catch (error) {
            console.error('Error creating transporter:', error);
            throw error; // Re-throw for handling in calling function
        }
    },
};

module.exports = mailController;
