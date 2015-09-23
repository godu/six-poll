var webpack = require('webpack');
var _ = require('lodash');

var config = require('./webapp/webpack.config');

var isProduction = process.env.NODE_ENV === 'production';

if(isProduction) {
  var prodConfig = extendProd(config);
  var prodCompiler = webpack(prodConfig);

  prodCompiler.run(function(err, stats) {
    if(err) throw err;

    var jsonStats = stats.toJson();
    if(jsonStats.errors.length > 0)
      throw new Error(jsonStats.errors);
    if(jsonStats.warnings.length > 0)
      throw new Error(jsonStats.warnings);
    return stats;
  });
}

function extendProd(config) {
  return _.extend({}, config, {
    plugins: [].concat(
      config.plugins, [
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        })
      ]
    ),
    module: _.extend(config.module, {
      loaders: [].concat(
        config.module.loaders, [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: ['babel']
        }]
      )
    })
  });
}
