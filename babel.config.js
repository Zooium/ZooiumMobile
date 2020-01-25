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
                    '@hooks': './src/hooks',
                    '@locales': './locales',
                    '@routes': './src/routes',
                    '@styles': './src/styles',
                    '@models': './src/models',
                    '@screens': './src/screens',
                    '@graphql': './src/graphql',
                    '@providers': './src/providers',
                    '@components': './src/components',
                },
            }],
        ],
    };
};
