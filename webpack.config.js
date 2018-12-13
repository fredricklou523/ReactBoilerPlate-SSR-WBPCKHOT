const path = require("path");
const webpack = require("webpack");


module.exports = {
  context: __dirname, //running from root directory- __dirname refers to root
  entry: "./src/ClientApp.jsx",
  devtool: "cheap",
  devtool: "cheap-eval-source-map", //source maps allows showing of pre-transpiled code when erorrs.  REMOVE FOR PRODUCTION< CREATES MASSIVE FILES
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    hotUpdateChunkFilename: "hot/hot-update.js",
    hotUpdateMainFilename: "hot/hot-update.json"
  },
  devServer: {
    publicPath: "/public/",
    historyApiFallback: true //required for browserrouter
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"] //when doing a require (./App), will check for file App cycling through the order of these extensions
  },
  stats: {
    //what errors to show
    colors: true,
    reasons: true, //better erorrs
    chunks: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, //anything with js or jsx run through babel
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
