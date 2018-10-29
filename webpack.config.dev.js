const merge = require("webpack-merge");
const webpackConfig = require("./webpack.config");

module.exports = merge(webpackConfig, {
  devtool: "eval-source-map",

  output: {
    pathinfo: true,
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "[name].js",
  },

  devServer: {
    host: "0.0.0.0",
    hot: true,
  },
});
