exports.devServer = ({ host, port } = {}) => ({
    devServer: {
      stats: "errors-only",
      host, // Defaults to `localhost`
      port, // Defaults to 8080
      open: false,
      overlay: true,
    },
  });

  exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: ["style-loader", "css-loader", "less-loader"],
        },
      ],
    },
  });