export default {
    client: 3,
    queryUrl: 'https://app.zooium.com/graphql',

    auth: {
        clientId: '3',
        serviceConfiguration: {
            // TODO revocationEndpoint: '',
            tokenEndpoint: 'https://app.zooium.com/oauth/token',
            authorizationEndpoint: 'https://app.zooium.com/oauth/authorize',
        },
    },

    socket: {
        broadcaster: 'pusher',
        disableStats: true,
        
        wsPort: 8443,
        wssPort: 8443,
        encrypted: true,
        key: 'jM3n23n@iPce@pMo',
        wsHost: 'socket.zooium.com',
        authEndpoint: 'https://app.zooium.com/broadcasting/auth',
    },
};
