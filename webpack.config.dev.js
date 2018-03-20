var config = require("./webpack.config");
var webpack = require("webpack");

config.devtool= 'source-map';
config.plugins.push(new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify('development') //定义编译环境
}));

module.exports = config;