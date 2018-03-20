var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var vendor = [
	"babel-polyfill",
	"es5-shim",
	"whatwg-fetch",
	"react",
	"react-dom",
	"history",
	"redux",
	"react-redux",
	"moment",
	path.resolve(__dirname,'src/plugin/upload/jquery'),
	"react-router"
]
module.exports= {
	entry: {
		index:[path.resolve(__dirname,'src/index.jsx')],
		login:[path.resolve(__dirname,'src/login.jsx')],
		vendor:vendor
	},
	output: {
		path: path.resolve(__dirname,'../webcenter/schooladmin'),
		publicPath:"",
		filename: "[name].js"
	},
	module:{
		rules:[{
			test:/\.js[x]?$/,
			exclude:/node_modules/,
			loader:["es3ify-loader","babel-loader"]
		},{
			test:/\.css$/,
			loader:ExtractTextPlugin.extract(["css-loader","postcss-loader"])
			//loader:["style-loader","css-loader?modules","postcss-loader"]
		},{
			test:/\.less$/,
			loader:ExtractTextPlugin.extract(["css-loader","postcss-loader","less-loader"])
			//loader:["style-loader","css-loader?modules","postcss-loader"]
		},{
			test:/\.s[a|c]ss$/,
			exclude:/node_modules/,
			loader:ExtractTextPlugin.extract(["css-loader?modules","postcss-loader","sass-loader"])
			//loader:["style-loader","css-loader?modules","postcss-loader","sass-loader"]
		},{
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /node_modules/,
            loader: 'file-loader?name=images/[name].[ext]'
        },{
            test: /\.(png|jpg)$/,
            exclude: /node_modules/,
            loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
            //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
        }]
		// },{
		// 	test:/\.jsx$/,
		// 	exclude:/^node_modules$/,
		// 	loader:"react-proxy-loader"
		// }]
	},
	plugins: [
		new ExtractTextPlugin("[name].css"),
		new webpack.optimize.CommonsChunkPlugin({ 
            name: 'vendor', 
            filename: 'vendor.js' 
        })
	],
    resolve: {
    	// alias:{
    	// 	'react':'anujs/dist/ReactIE',
    	// 	'react-dom':'anujs/dist/ReactIE'
    	// },
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'] //后缀名自动补全
    }
}