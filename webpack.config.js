const webpack = require('webpack');
const path = require('path');
const RemovePlugin = require("remove-files-webpack-plugin");

const buildPath = path.resolve(process.cwd(), 'dist');

const client = {
  entry: './src/client.ts',

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
        include: [path.resolve(buildPath, "client")]
      },
      watch: {
        include: [path.resolve(buildPath, "client")]
      }
    })
  ],
  optimization: {
    minimize: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  output: {
    path: path.resolve(buildPath, "client"),
    filename: "[contenthash].client.js"
  }
}

const server = {
  entry: './src/server.ts',

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
        include: [path.resolve(buildPath, "server")]
      },
      watch: {
        include: [path.resolve(buildPath, "server")]
      }
    })
  ],
  optimization: {
    minimize: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  output: {
    path: path.resolve(buildPath, "server"),
    filename: "[contenthash].server.js"
  },
  target: "node"
}

module.exports = [client, server];