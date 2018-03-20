var config = require("./webpack.config");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

config.devtool= 'source-map';
config.plugins.push(new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify('local') //定义编译环境
}),new HtmlWebpackPlugin({
	template:'index.html',
	chunks:['index'],
	filename:'index.html'
}),new HtmlWebpackPlugin({
	template:'login.html',
	chunks:['login'],
	filename:'login.html'
}));

module.exports = config;