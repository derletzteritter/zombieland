const webpack = require('webpack');
const path = require('path');
const RemovePlugin = require("remove-files-webpack-plugin");

const buildPath = path.resolve(process.cwd(), 'dist');

const server = {
  entry: './server.ts',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new RemovePlugin({
      before: {
        include: [path.resolve(buildPath)]
      },
      watch: {
        include: [path.resolve(buildPath)]
      }
    })
  ],
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  experiments: {
    topLevelAwait: true,
  },

  output: {
    path: path.resolve(buildPath),
    filename: "server.js"
  },
  target: "node"
}

module.exports = [server];