const path = require('path');
const webpack = require('webpack');


module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: {
    path: path.resolve(process.cwd(), 'build'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
    ],
  },

  plugins: options.plugin.concat([
    new webpack.EnvironmentPlugin({
      "NODE_ENV": "development"
    })
  ]),

  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".react.js"]
  }

});
