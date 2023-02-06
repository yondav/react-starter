const { merge } = require('webpack-merge');

const config = {
  common: require('./webpack.common'),
  dev: require('./webpack.dev'),
  prod: require('./webpack.prod'),
};

module.exports = function webpackConfig(env, argv) {
  if (argv.mode === 'production') {
    return merge(config.common, config.prod);
  }
  return merge(config.common, config.dev);
};
