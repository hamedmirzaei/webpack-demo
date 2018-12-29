const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
require('dotenv').config();
const parts = require("./webpack.parts");
const path = require("path");
const glob = require("glob");

const outputDirectory = 'dist';

const PATHS = {
  app: path.join(__dirname, "src"),
};

const commonConfig = merge([
  {
    entry: ['@babel/polyfill', './src/index.js'],
    plugins: [
      new CleanWebpackPlugin([outputDirectory]),
      new HtmlWebpackPlugin({
        title: "Webpack demo page",
      }),
    ],
  },
  parts.loadJavaScript({ include: PATHS.app }),
]);

const productionConfig = merge([
  parts.extractCSS({
    use: ["css-loader", parts.autoprefix()],
    options: {
      limit: 15000,
      name: "./css/[name].[ext]",
    },
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: "./images/[name].[ext]",
    },
  }),
  parts.loadFonts({
    options: {
      limit: 40000,
      mimetype: "application/font-woff",
      name: "./fonts/[name].[ext]", // Output below ./fonts
      publicPath: "../", // Take the directory into account
    },
  }),
  parts.loadTS({
    options: {
      limit: 40000,
      name: "./ts/[name].[ext]", // Output below ./fonts
      publicPath: "../", // Take the directory into account
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
  parts.loadFonts(),
  parts.loadTS(),
]);

module.exports = env => {
  var mode = env.target;
  process.env.BABEL_ENV = mode;
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }
  return merge(commonConfig, developmentConfig, { mode });
};