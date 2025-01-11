module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    'react-native-reanimated/plugin',
    ['@babel/plugin-proposal-class-properties', {loose: false}],
    ['@babel/plugin-transform-private-methods', {loose: false}],
    ['@babel/plugin-transform-private-property-in-object', {loose: false}],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
  assumptions: {
    setPublicClassFields: true,
    privateFieldsAsSymbols: true,
  },
};
