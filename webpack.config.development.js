/***
 * This config file has been rewritten from scratch for clarity
 * Dedicated for older webpack v 1.14.0, as described in package.json
 * See that some dependencies require the older webpack package
 */

const path = require('path');
const webpack = require('webpack');

// All configured to make it as simple as possible
// Please read https://survivejs.com/webpack/developing/configuring-hmr/
function makeDevelopmentConfig(commonConfig) {
  const config = {
    entry: './client/main',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: "/dist/",
      filename: 'compiled.bundle.js'
    },
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Don't refresh if hot loading fails. If you want
      // refresh behavior, set hot: true instead.
      hotOnly: false,

      hot: false,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Docker, Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: process.env.HOST, // Defaults to `localhost`
      port: process.env.PORT, // Defaults to 8080

      // Enable error/warning overlay
      overlay: {
        errors: true,
        warnings: true,
      },
      watchOptions: {
        poll: true
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ]
  };
  return Object.assign(
    {},
    commonConfig,
    config,
    {
      plugins: commonConfig.plugins.concat(config.plugins),
    }
  );
};


console.log("================================================================");
console.log("Visit http://localhost:8080/webpack-dev-server/client/index.html");
console.log("   or http://localhost:8080/client/index.html");
console.log("================================================================");

var genericConfig = require("./webpack.config.generic.js");
var developmentConfig = makeDevelopmentConfig(genericConfig);
module.exports = developmentConfig;