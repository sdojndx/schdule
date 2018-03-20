var config = require("./webpack.config");
var webpack = require("webpack");
var path = require("path");

//config.output.path = path.resolve(__dirname,'../build/schooladmin'),
config.plugins.push(new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify('production') //定义编译环境
}),new webpack.optimize.UglifyJsPlugin({
    compress: {
        properties: false,
        warnings: false,
 		screw_ie8: false
    },
    mangle: {
        screw_ie8: false
    },
    output: {
        beautify: false,
        quote_keys: true
    },
    sourceMap: false,
    support_ie8: true
}),
new webpack.optimize.ModuleConcatenationPlugin())

module.exports = config;