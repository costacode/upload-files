const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const WebpackMd5Hash = require('webpack-md5-hash');
const devMode = process.env.NODE_ENV !== 'production';

const outDir = 'public';

module.exports = {
	entry: {
		app: './src/index.js',
	},
	output: {
		path: path.join(__dirname, outDir),
		filename: '[name].bundle.[hash].js',
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
						options: { url: false, sourceMap: true },
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
						options: { sourceMap: true },
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
		new HtmlWebpackPlugin({
			title: 'Production',
			inject: 'true',
			// hash: true,
			template: './src/index.html',
			filename: 'index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].bundle.[hash].css',
			chunkFilename: '[id].css',
		}),
		// new WebpackMd5Hash(),
	],
};
