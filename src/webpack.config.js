const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (process.env.NODE_ENV === "production") {
        // Enable code splitting for lazy loading
        webpackConfig.optimization.splitChunks = {
          chunks: "all",
        };

        // Apply compression (gzip) to reduce bundle size
        webpackConfig.plugins.push(
          new CompressionPlugin({
            test: /\.(js|css)$/,
            filename: "[path][base].gz",
            algorithm: "gzip",
          })
        );
      }
      return webpackConfig;
    },
  },
};
