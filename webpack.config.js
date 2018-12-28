const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
require('dotenv').config();
const parts = require("./webpack.parts");

const path = require("path");
const glob = require("glob");

const PATHS = {
  app: path.join(__dirname, "src"),
};

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo page",
      }),
    ],
  }
]);

const productionConfig = merge([
  parts.extractCSS({
    use: ["css-loader", parts.autoprefix()],
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[ext]",
    },
  }),
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

module.exports = env => {
  var mode = env.target;
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }
  return merge(commonConfig, developmentConfig, { mode });
};