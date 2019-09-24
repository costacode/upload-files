const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	// You may want 'eval' instead if you prefer to see the compiled output in DevTools.
	devtool: "cheap-module-source-map",
	devServer: {
		contentBase: common.output.path,
		compress: true,
		port: 3000,
		hot: true,
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
});
