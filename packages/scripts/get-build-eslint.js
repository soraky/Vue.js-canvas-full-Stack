const getWebpackConfig = require('./get-webpack-config');

module.exports = ({
  build,
}) => ({
  globals: {
    __PROD__: false,
    __DEV__: false,
    __APP_NAME__: false,
    __DEVSERVER__: false,
    __DEVTOOLS__: false,
    __VERSION__: false,
    'process.env.NODE_ENV': false,
  },
  rules: {
    'jsx-a11y/no-static-element-interactions': [0],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: getWebpackConfig(build.params),
      },
    },
  },
});
