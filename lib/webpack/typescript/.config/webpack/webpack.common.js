const path = require('path');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const rootDir = path.resolve(__dirname, '..', '..');

module.exports = {
  entry: path.join(rootDir, 'src/index.tsx'),
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.join(rootDir, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    modules: [path.join(rootDir, 'src'), 'node_modules'],
    alias: {
      react: path.join(rootDir, 'node_modules', 'react'),
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(rootDir, 'tsconfig.json'),
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?(\?.*)?$/i,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(jpe?g|gif|png)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
};
