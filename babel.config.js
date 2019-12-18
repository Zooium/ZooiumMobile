module.exports = function(api) {
    api.cache(true);

    return {
        presets: ['babel-preset-expo', 'module:react-native-dotenv'],
        plugins: [
            ['module-resolver', {
                root: ['./'],
                alias: {
                    '@src': './src',
                    '@assets': './assets',
                    '@utils': './src/utils',
                    '@locales': './locales',
                    '@routes': './src/routes',
                    '@styles': './src/styles',
                    '@screens': './src/screens',
                    '@graphql': './src/graphql',
                    '@settings': './src/settings',
                    '@components': './src/components',
                },
            }],
        ],
    };
};
