module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        // ... other configs, if any
        // 'react-native-reanimated/plugin',
        [
            'module-resolver',
            {
                extensions: [
                    '.ios.js',
                    '.android.js',
                    '.ios.jsx',
                    '.android.jsx',
                    '.js',
                    '.jsx',
                    '.json',
                    '.ts',
                    '.tsx',
                ],
                root: ['.'],
                alias: {
                    '@src': './src',
                    //   '@assets': './src/assets',
                    //   '@components': './src/components',
                    //   '@constants': './src/constants',
                    //   '@hooks': './src/hooks',
                    //   '@navigation': './src/navigation',
                    //   '@screens': './src/screens',
                    //   '@theme': './src/theme',
                    //   '@utils': './src/utils',
                    //   '@store': './src/store',
                    //   '@services': './src/services',
                    //   '@types': './src/types',
                    '@packages': './packages',
                    '@pkg-hooks': './packages/hooks',
                    '@pkg-ui-kit': './packages/ui-kit',
                    '@pkg-utils': './packages/utils',
                },
            },
        ],
        // ... other configs, if any
    ],
};
