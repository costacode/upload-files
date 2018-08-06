const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new UglifyJSPlugin({
			cache: true,
			parallel: true,
			sourceMap: true,
		}),
		new OptimizeCSSAssetsPlugin({}),
	],
});
