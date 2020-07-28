/* eslint-disable */
const CopyPlugin = require("copy-webpack-plugin");

const copyRules = [
  {
    from: __dirname + "/src/index.html",
    to: __dirname + "/dist/index.html",
  },
];

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  plugins: [new CopyPlugin({ patterns: copyRules })],
};
