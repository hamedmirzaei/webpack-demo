const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
require('dotenv').config();
const parts = require("./webpack.parts");

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo page",
      }),
    ],
  },
  parts.loadCSS(),
]);

const productionConfig = merge([]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
  }),
]);

module.exports = env => {
  var mode = env.target;
  console.log("mode is = " + mode)
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }
  return merge(commonConfig, developmentConfig, { mode });
};