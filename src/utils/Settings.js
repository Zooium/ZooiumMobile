export default {
    client: 3,
    authUrl: 'https://app.zooium.com/oauth',
    queryUrl: 'https://app.zooium.com/graphql',

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
