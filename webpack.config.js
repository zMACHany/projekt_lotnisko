const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
module.exports = {
	entry: {
		index:'./src/index.js',
		podsumowanie:'./src/podsumowanie.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		open: true,
		compress: true,
		port: 3300,
		hot: false,
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			chunks:['index']
		}),
		new HtmlWebpackPlugin({
			template: './src/podsumowanie.html',
			filename: 'podsumowanie.html',
			chunks:['podsumowanie'],
		}),
		new MiniCssExtractPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					// "style-loader",
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [['autoprefixer']],
							},
						},
					},
				],
			},
			{
				test: /\.(js|mjs|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-syntax-top-level-await'],
					},
				},
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash].[ext]',
							outputPath: 'images',
						},
					},
				],
			},
		],
	},
	experiments: {
		topLevelAwait: true,
	},
};
