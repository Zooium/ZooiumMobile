module.exports = function(api) {
    api.cache(true);

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ['module-resolver', {
                root: ['./'],
                alias: {
                    '@src': './src',
                    '@assets': './assets',
                    '@locales': './locales',
                    '@routes': './src/routes',
                    '@styles': './src/styles',
                    '@screens': './src/screens',
                    '@components': './src/components',
                },
            }],
        ],
    };
};
