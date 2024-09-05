# Getting Start

## Step 1: Install module-resolver

```sh
npm install --save-dev babel-plugin-module-resolver
```

## Step 2: At babel.config.js add plugins

```js
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
```

## Step 3: At tsconfig.json add compilerOptions

```json
{
    "extends": "@react-native/typescript-config/tsconfig.json",
    "compilerOptions": {
        // ... other configs, if any
        "baseUrl": ".",
        "paths": {
            "@src/*": ["src/*"],
            //   "@assets/*": ["src/assets/*"],
            //   "@components/*": ["src/components/*"],
            //   "@constants/*": ["src/constants/*"],
            //   "@hooks/*": ["src/hooks/*"],
            //   "@navigation/*": ["src/navigation/*"],
            //   "@screens/*": ["src/screens/*"],
            //   "@theme/*": ["src/theme/*"],
            //   "@utils/*": ["src/utils/*"],
            //   "@store/*": ["src/store/*"],
            //   "@services/*": ["src/services/*"],
            //   "@types/*": ["src/types/*"],
            "@packages/*": ["packages/*"],
            "@pkg-hooks/*": ["packages/hooks/*"],
            "@pkg-ui-kit/*": ["packages/ui-kit/*"],
            "@pkg-utils/*": ["packages/utils/*"]
        }
    }
}
```

## Step 4: Cheer!, We already have completed, let's run

```sh
npm run ios
npm start -- --reset-cache
```