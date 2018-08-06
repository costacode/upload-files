const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const outDir = 'public';

module.exports = {
	entry: {
		app: './src/index.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, outDir),
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
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { url: false, sourceMap: true },
					},
					{ loader: 'sass-loader', options: { sourceMap: true } },
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
			inject: 'body',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].bundle.css',
			chunkFilename: '[id].css',
		}),
	],
};
