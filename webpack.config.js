const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

module.exports = {
	mode: mode,
	target: target,
	devtool: devtool,
	devServer: {
		port: 3000,
		open: true,
		hot: true,
	},
	entry: path.resolve(__dirname, "src", "index.js"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.[contenthash].js",
		// assetModuleFilename: "assets/[name].[hash][ext]",
		clean: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html"),
		}),
		new MiniCssExtractPlugin({
			filename: "bundle.[contenthash].css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					devMode ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [require("postcss-preset-env")],
							},
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.(?:js|mjs|cjs)$/i,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [["@babel/preset-env", { targets: "defaults" }]],
					},
				},
			},
			{
				test: /\.woff$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/fonts/[name].[hash][ext]",
				},
			},
			{
				test: /\.(jpe?g|webp|png|svg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/images/[name].[hash][ext]",
				},
				use: [
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true,
							},
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
							webp: {
								quality: 75,
							},
						},
					},
				],
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin()],
	},
};
