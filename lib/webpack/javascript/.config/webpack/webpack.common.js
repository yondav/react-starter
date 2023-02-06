const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const rootDir = path.resolve(__dirname, '..', '..');

module.exports = {
  entry: path.join(rootDir, 'src/index.jsx'),
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.join(rootDir, 'dist'),
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [path.join(rootDir, 'src'), 'node_modules'],
    alias: {
      react: path.join(rootDir, 'node_modules', 'react'),
      components: path.join(rootDir, 'src', 'components'),
      contexts: path.join(rootDir, 'src', 'contexts'),
      hooks: path.join(rootDir, 'src', 'hooks'),
      pages: path.join(rootDir, 'src', 'pages'),
      styles: path.join(rootDir, 'src', 'styles'),
      utils: path.join(rootDir, 'src', 'utils'),
      views: path.join(rootDir, 'src', 'views'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?(\?.*)?$/i,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
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
