const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	devtool: false,
	// devtool: "cheap-source-map", //best quality SourceMaps for development.
	// devtool: "inline-source-map",
	devServer: {
		contentBase: common.output.path,
		compress: true,
		port: 3000,
		hot: true,
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		// new webpack.HotModuleReplacementPlugin(),
		new webpack.SourceMapDevToolPlugin({
			filename: "[file].map",
		}),
	],
});
