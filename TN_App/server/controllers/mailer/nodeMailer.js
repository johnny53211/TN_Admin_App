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
                    refreshToken: '1//04gjA7esqJAtECgYIARAAGAQSNwF-L9Ir_3fCgRmB2oc_eXm1WB-wVdQ1y1tFn2zEb9wtbgdU1UmHYfT0HfFeSQzGArwdlcj_N7k',
                    accessToken: 'ya29.a0Ad52N39v1_rEmeebzmUK6Sd-TsN2SGu1z0OwIWSnfXVpTDdQTz4-k7pL4FA3SUfRp16jK8ZW8AkfOeoDy0NV9vMiqPjeJaqnoxci7hVIT85Cn8VbwjkLLNtjO9LbiZbf9vMaB4Jg3zTMMlOopu16pWyq544XJhyPhH1EaCgYKAb8SARASFQHGX2MiuIwiLoL8HbWpVdavSNH7bw0171',
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
