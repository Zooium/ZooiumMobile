export default {
    client: 3,
    queryUrl: 'https://app.zooium.com/graphql',

    auth: {
        client: '3',
        endpoints: {
            token: 'https://app.zooium.com/oauth/token',
            authorize: 'https://app.zooium.com/oauth/authorize',
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
