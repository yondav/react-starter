const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');

const rootDir = path.resolve(__dirname, '..', '..');

module.exports = {
  entry: path.join(rootDir, 'src/index.tsx'),
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: '[ name ].[ chunkhash ].bundle.js',
    chunkFilename: '[ name ].[ chunkhash ].bundle.js',
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js.gz');
    },
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
      cacheGroups: {
        default: {
          minChunks: 2,
          reuseExistingChunk: true,
        },
        vendor_react: {
          test: /.*\/node_modules\/react\//i,
          name: 'vendor-react',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new DotenvPlugin({
      path: path.join(rootDir, '.env.production.local'),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    new CompressionPlugin({
      test: /\.[jt]sx?(\?.*)?$/i,
    }),
    new CopyPlugin({
      patterns: [{ from: './_redirects' }],
    }),
  ],
};
