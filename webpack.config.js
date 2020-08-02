/* eslint-disable */
const CopyPlugin = require('copy-webpack-plugin');
const WorkerPlugin = require('worker-plugin');

const copyRules = [
  {
    from: __dirname + '/src/index.html',
    to: __dirname + '/dist/index.html',
  },
];

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      react: require.resolve('preact/compat'),
      'react-dom': require.resolve('preact/compat'),
    },
  },
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        use: [
          {
            loader: 'comlink-loader',
            options: {
              singleton: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  plugins: [new CopyPlugin({ patterns: copyRules }, new WorkerPlugin())],
};
