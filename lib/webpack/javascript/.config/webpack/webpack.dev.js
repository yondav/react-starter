const path = require('path');
const DotenvPlugin = require('dotenv-webpack');
const webpack = require('webpack');

const rootDir = path.resolve(__dirname, '..', '..');

module.exports = {
  entry: path.join(rootDir, 'src/index.jsx'),
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    hot: true,
    open: true,
    historyApiFallback: true,
    static: { directory: path.join(rootDir, 'public') },
    port: 1234,
  },
  plugins: [
    new DotenvPlugin({
      path: path.join(rootDir, '.env.development.local'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
