let mqttConfig = config.mqttConfig, configOption = mqttConfig.configOption;
const mqttModule = {
    defaultProtocol: mqttConfig.defaultProtocol,
    mqttClient: '',
    getConnectionUrl: () => {
        //websocket using mqtt port
        return `${configOption.protocol}://${configOption.url}:${configOption.port}/mqtt`;
    },
    getOptions: () => {
        return {
            username: configOption.credentials.username,
            password: configOption.credentials.password,
            clientId: mqttConfig.serviceName,
            useSSL: configOption.ssl,
            rejectUnauthorized: configOption.rejectUnauthorized,
            reconnectPeriod: configOption.reconnectPeriod,
            keepalive: configOption.keepalive,//waiting time in sec before device fires disconnect event
            protocolId: configOption.protocolId,
            protocolVersion: configOption.protocolVersion,
            clean: configOption.clean, //true or false. clean session does not store session
            connectTimeout: configOption.connectTimeout,
            will: configOption.will
        }
    },
    init: () => {
        mqttModule.getConnectionUrl()
        let url = mqttModule.getConnectionUrl(),
            credentials = mqttModule.getOptions();
        mqttModule.mqttClient = mqtt.connect(url, credentials);
        mqttModule.onConnect();
        mqttModule.reconnect();
    },
    onConnect: () => {
        mqttModule.mqttClient.on('connect', (packet) => {
            if (!packet.sessionPresent) {
                console.log("mqtt client connected with broker: 1");
                // get & handle topics data
                mqttModule.onMessage();
            }
        });
    },
    subscribe: (topic, options = {}) => {
        options.qos = options.qos || configOption.defaultQos;
        console.log(topic);
        mqttModule.mqttClient.subscribe(topic, options, function (err, data) {
            if (err)
                console.log('error on subscription: ', err);
        });
    },
    unsubscribe: (topic, options = {}) => {
        mqttModule.mqttClient.unsubscribe(topic, options);
    },
    publish: (topic, message, options = {}, callback) => {
        options.qos = options.qos || configOption.defaultQos;

        if (typeof message == "object")
            message = JSON.stringify(message);
        mqttModule.mqttClient.publish(topic, message, options, callback);
    },
    onMessage: (macID = "") => {
        mqttModule.mqttClient.on("message", function (topic, message, packet) {
            console.log('topic', topic, 'message', message, 'packet', packet);
        })
    },
    reconnect: () => {
        return new Promise((resolve, reject) => {
            mqttModule.mqttClient.end(true, {}, () => {
                mqttModule.mqttClient.reconnect();
                resolve();
            });
        });
    },
    offline: () => {
        mqttModule.mqttClient.on('offline', () => {
            console.log('went offline');
        })
    },
    error: () => {
        mqttModule.mqttClient.on('error', (err) => {
            console.log('got error', err);
        })
    },
    close: () => {
        mqttModule.mqttClient.on('close', () => {
            console.log('connection closed');
        })
    }

}
