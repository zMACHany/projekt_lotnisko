const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		open: true,
		compress: true,
		port: 3000,
		hot: false,
	},
	plugins: [
        new HtmlWebpackPlugin({
        template: "./src/index.html"
        }),
        new MiniCssExtractPlugin()
       ] ,
	module: {
		rules: [
			{
                test: /\.scss$/,
                use: [
                // "style-loader",
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
                {
                loader: "postcss-loader",
                options: {
                postcssOptions: {
                plugins: [
                ["autoprefixer"]
                ]
                }
                }
                }
                ]
               },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				type: 'asset/resource',
			},
		],
	},
};
