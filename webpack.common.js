const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Folder for final production files
const targetFolder = 'assets';

// path for target folder outside the webpack root
// not outside? comment out this line
const targetPath = '../';

// options for cleaning folder outside the webpack root
// not outside? comment out this block
let cleanOptions = {
	root: path.join(__dirname, targetPath),
	exclude: [
		// folders and files to exclude from clean plugin
		'images',
	],
	verbose: true,
	dry: false,
	allowExternal: true,
};

// const webpackConfig = {};
// if (process.env.NODE_ENV === "development") {
// 	webpackConfig.devtool = "inline-source-map";
// }

module.exports = {
	// entry point of your app
	entry: {
		maya: './src/index.js',
	},
	// output point
	output: {
		path: path.join(__dirname, targetPath, targetFolder),
		filename: '[name].bundle.js',
	},
	// loaders
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					// transforming ES6 down to ES5
					loader: 'babel-loader',
					query: {
						presets: ['env'],
					},
				},
			},
			{
				test: /\.s?[ac]ss$/,
				use: [
					// Extracts CSS into a separate file
					MiniCssExtractPlugin.loader,
					{
						// CSS loader takes a CSS file and returns it with
						// @import and url() via import/require()
						loader: 'css-loader',
						options: {
							url: false,
							sourceMap: true,
							outFile: true,
						},
					},
					{
						// set css autoprefixer
						loader: 'postcss-loader', // autoprefixer!
						options: {
							config: {
								path: 'postcss.config.js',
							},
						},
					},
					{
						// compiles Sass to CSS
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							sourceComments: true,
							outFile: true,
							includePaths: [path.join(__dirname, 'src')],

							// important as webpack doesn't recognize
							// @imports of sass variables or mixins
							data: '@import "variables"; @import "utils";',
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
		// target folder is outside the webpack root:
		new CleanWebpackPlugin([targetFolder], cleanOptions),

		// target folder is INSIDE the webpack root
		// new CleanWebpackPlugin([targetFolder]),

		// want to write files to the disk while in dev mode?
		new WriteFilePlugin({
			useHashIndex: false,
			test: /^(?!.*(hot)).*/,
		}),
		// plugin: https://github.com/jantimon/html-webpack-plugin
		new HtmlWebpackPlugin({
			inject: 'true',
			// hash: true,
			template: './src/index.html',
			filename: 'index.html',
		}),
		// plugin to extract css file
		new MiniCssExtractPlugin({
			filename: '[name].bundle.css',
			chunkFilename: '[id].css',
		}),
	],

	// chunks optimization - since webpack 4, what is it...?
	// read: https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
	// optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			vendor: {
	// 				name: 'vendors',
	// 				test: /[\\/]node_modules[\\/]/,
	// 				chunks: 'all',
	// 				enforce: true,
	// 			},
	// 			// Merge all the CSS into one file
	// 			styles: {
	// 				name: 'styles',
	// 				test: /\.css$/,
	// 				chunks: 'all',
	// 				enforce: true,
	// 			},
	// 		},
	// 	},
	// },
};
