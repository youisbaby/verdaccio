const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./lib/web/index.js",
	output: {
    path: path.resolve(__dirname, '../lib/static'),
    filename: 'browser.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules|examples/,
        use: "babel-loader"
      },
      {
         test: /\.(jpe?g|png|gif|svg)$/i, 
         use: "file-loader?name=/[name].[ext]"
      },
      {
          test: /\.(ttf|eot|woff|woff2|svg)$/,
          loader: "url-loader?limit=50000&name=fonts/[hash].[ext]"
      },      
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
        "process.env": {
            BROWSER: JSON.stringify(true)
        }
    })
  ],
  resolve: {
    extensions: ['.js', '.css']
  }
};