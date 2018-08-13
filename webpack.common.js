const path = require('path');
// const WriteFilePlugin = require('write-file-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const devMode = process.env.NODE_ENV !== 'production';

// Paths
const outDir = 'public';

////////////////////////////////////////
// CleanWebpackPlugin:
// Optional block, use it if target folder is outside the webpack root
// On Webpack, the Node variable '__dirname' has the fixed value of '/'
///////////////////////////////////////

// const targetPath = '../';
// const targetFolder = 'public';

// the clean options to use
// let cleanOptions = {
// 	root: path.join(__dirname, targetPath),
// 	exclude: [
// 		// folders and files to exclude from clean plugin
// 		'dir1',
// 		'dir2',
// 		'dir3',
// 		'file.js',
// 	],
// 	verbose: true,
// 	dry: false,
// 	allowExternal: true,
// };

module.exports = {
	entry: {
		app: './src/index.js',
	},
	output: {
		path: path.join(__dirname, outDir),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					query: {
						presets: ['env'],
					},
				},
			},
			{
				test: /\.s?[ac]ss$/,
				use: [
					'style-loader', // fallback
					MiniCssExtractPlugin.loader, // Adds CSS to the DOM by injecting a <style> tag
					{
						loader: 'css-loader', //  interprets @import and url() like import/require()
						options: { url: false, sourceMap: true, outFile: true },
					},
					{
						loader: 'postcss-loader', // postcss loader so we can use autoprefixer
						options: {
							config: {
								path: 'postcss.config.js',
							},
						},
					},
					{
						loader: 'sass-loader', // compiles Sass to CSS
						options: {
							sourceComments: true,
							sourceMap: true,
							outFile: true,
						},
					},
				],
			},
			{ test: /\.(jpg|png|gif|svg|tiff)$/, use: 'file-loader' },
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: 'file-loader',
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin([outDir]),

		// CleanWebpackPlugin:
		// Optional, use it instead, if target folder is outside the webpack root
		// new CleanWebpackPlugin([targetFolder], cleanOptions),

		// If you want to write files to the disk while in dev mode
		// new WriteFilePlugin({
		// 	useHashIndex: false,
		// 	test: /^(?!.*(hot)).*/,
		// }),

		new HtmlWebpackPlugin({
			title: 'Production',
			inject: 'true',
			// hash: true,
			template: './src/index.html',
			filename: 'index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].bundle.css',
			chunkFilename: '[id].css',
		}),
	],
};
