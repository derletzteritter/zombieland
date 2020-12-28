const path = require('path');
const HtmlWebpckPlugin = require('html-webpack-plugin');

module.exports = require('./webpack.common')({
  mode: "production",

  entry: [path.resolve(process.cwd(), 'src/index.tsx')],

  plugin: [
    new HtmlWebpckPlugin({
      template: 'public/index.html',
      minify: {
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeRedundantAttributes: true, 
        removeEmptyAttributes: true,
        collapseWhitespace: true
      },
      inject: 'body'
    }),
  ],

  performance: {
    assetFilter: (assetFilename) =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },

})
