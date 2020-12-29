const webpack = require('webpack');
const path = require('path');
const RemovePlugin = require("remove-files-webpack-plugin");

const buildPath = path.resolve(process.cwd(), 'dist');

const client = {
  entry: "./client/client.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new RemovePlugin({
      before: {
        include: [path.resolve(buildPath)],
      },
      watch: {
        include: [path.resolve(buildPath)],
      },
    }),
  ],
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[contenthash].client.js",
    path: path.resolve(buildPath),
  },
};

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
    minimize: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },

  output: {
    path: path.resolve(buildPath),
    filename: "[contenthash].server.js"
  },
  target: "node"
}

module.exports = [server];