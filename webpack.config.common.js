/***
 * This config file has been rewritten from scratch for clarity
 * Dedicated for older webpack v 1.14.0, as described in package.json
 * See that some dependencies require the older webpack package
 */

const path = require('path');

function makeCommonConfig() {
  const config = {
    entry: "./client/main",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'compiled.bundle.js'
    },
    resolve: {
      modulesDirectories: ['node_modules'],    
      extensions: ['', '.ts', '.tsx', '.js'] // we are using webpack 1 and need a '' in the array as well
    },
    resolveLoader: {
      root: path.join(__dirname, "node_modules")
    },
    plugins: [],
    target: 'web',
    module: {
      loaders: [
        {
          extensions: [ 'js' ],
          test: /\.(js)(\?.*)?$/,
          loaders: [ 'babel-loader' ],
          include: path.join(__dirname, "..", "client")
        },
        {
          extensions: [ 'ts', 'tsx' ],
          test: /\.(ts|tsx)(\?.*)?$/,
          loaders: [ 'ts-loader' ] 
        },
        {
          test: /\.(css)(\?.*)?$/,
          extensions: [ 'css' ],
          loader: 'style-loader!css-loader' 
        },
        { 
          test: /\.png$/, 
          loader: "url-loader?limit=100000" 
        },
        { 
          test: /\.jpg$/, 
          loader: "file-loader" 
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'file'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url?limit=10000&mimetype=image/svg+xml'
        }
      ]
    },
  };
  return config;
};

console.log("================================================================");
console.log("Visit http://localhost:8080/webpack-dev-server/client/index.html");
console.log("   or http://localhost:8080/client/index.html");
console.log("================================================================");

module.exports = makeCommonConfig();