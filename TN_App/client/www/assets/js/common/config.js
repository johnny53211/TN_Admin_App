// ========================================
/* 
   Author       : Johnson R 
   Created Date : 
   updated Date :
   Description  : config Of vault setup app
*/
// ========================================
'use strict';
let config = {
    PORT: 4000,
    loginServiceUrl: "https://test.buildtrack.in/buildtrack/branches",
    serviceUrl: 'http://192.168.1.91:5000',
    userStatuses: {
        "0": "Account is deactivated, Contact Administrator",
        "401": "Invalid Username or Password."
    },
    linkAccountStatus: {
        0: 'User not linked',
        401: 'Required all Fields',
        503: 'failed',
        403: 'Already exist',
        404: "Not Found"
    },
    serverDetails: [
        {
            id: "test-socket",
            type: "1",
            name: " [SOCKET] Test Server",
            port: "443",
            authKey: '4nedc2xrPQcphbqH45Eo',
            url: 'https://test.buildtrack.in',
            path: '/service/socket',
            autoConnect: true
        },
        {
            id: "prod-socket",
            type: "1",
            name: "[SOCKET] Production Server",
            port: "443",
            authKey: '4nedc2xrPQcphbqH45Eo',
            url: 'https://ms.buildtrack.in',
            path: '/service/socket',
            autoConnect: false
        },
        {
            id: "test-mqtt",
            type: "2",
            name: "[MQTT] Test Server",
            port: "443",
            url: 'https://test.buildtrack.in',
            credentials: {
                username: 'btmqtt',
                password: 'btmqtt123'
            },
            autoConnect: true
        },
        {
            id: "prod-mqtt",
            type: "2",
            name: "[MQTT] Production Server",
            port: "443",
            url: 'https://ms.buildtrack.in',
            credentials: {
                username: 'btmqtt',
                password: 'btmqtt123'
            },
            autoConnect: false
        },
        {
            id: "vault-mqtt",
            type: "2",
            name: "[MQTT - LOCAL] BT Vault Server",
            port: "80",
            url: 'https://ms.buildtrack.in',
            credentials: {
                username: 'btmqtt',
                password: 'btmqtt123'
            },
            autoConnect: false
        }
    ],
    mqttConfig: {
        serviceName: 'btz-01' + Date.now(),
        defaultProtocol: "mqtt",
        configOption: {
            protocol: 'wss',
            ssl: true,
            port: "443",
            url: "test.buildtrack.in",
            credentials: {
                username: 'btmqtt',
                password: 'btmqtt123'
            },
            defaultQos: 1,
            rejectUnauthorized: false,
            reconnectPeriod: 1000 * 1,
            keepalive: 60, //waiting time in sec before device fires disconnect event
            protocolId: 'MQTT',
            protocolVersion: 3,
            clean: false, //true or false. clean session does not store session
            connectTimeout: 30 * 1000,
            will: {
                topic: 'WillMsg',
                payload: 'Connection Closed abnormally..!', // message to be sent on abnormal disconnection
                qos: 0,
                retain: false
            }
        }
    }
}