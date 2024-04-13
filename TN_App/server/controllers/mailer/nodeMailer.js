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

    sendMail: async (options = {}) => {
        let { to, content } = options;
        try {
            const transporter = await mailController.getTransporter();
            const info = await transporter.sendMail({
                from: 'johnson02032001@gmail.com',
                to: to,
                subject: "Events",
                text: content,
                auth: {
                    user: 'a09216214@gmail.com',
                    refreshToken: '1//04rkbBhJ2eqIzCgYIARAAGAQSNwF-L9IrF0Rv_w78iUdSJUwOf1sLNHBtNpJokMCHaZzWcHvuatVpBBNY--8t4mgOPC4D67NpGsM',
                    accessToken: 'ya29.a0Ad52N3_jqnV7QLXMttqqaVxCF3GKp9iJUy2EPTCSohNaLBolp9ZLQWKMnUHN0WOQMzQhPnVqd0FQ8u-WT4s2qY7CdJ722xY2BelMV3fXS181TNXxDGoED6ihxHpP2Yj0N_KiU98wVv38SOsftS028kZaTU3GccCnsNacaCgYKAWASARASFQHGX2Mi1XPEvymITMjPHOhwhkiAiA0171',
                },
            });
            return info;
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

    getTransporter: async (content) => {
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
            return transporter;
        } catch (error) {
            console.error('Error creating transporter:', error);
            throw error; // Re-throw for handling in calling function
        }
    },
};

module.exports = mailController;
