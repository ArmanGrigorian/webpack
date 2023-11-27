************* CONFIGURE WEBPACK STEP BY STEP *************

1. main configuration 									| 01 - 16 |
2. server configuration									| 17 - 17 |
3. html configuration									| 18 - 21 |
4. css configuration										| 22 - 24 |
5. js configuration	(babel)							| 25 - 25 |
6. fonts configuration									| 26 - 27 |
7. images configuration 								| 28 - 29 |
8. image optimization									| 30 - 31 |

Links:
🔗 https://webpack.js.org/
🔗 https://www.npmjs.com/package/image-webpack-loader/v/8.1.0

//////////////////////////////////////////////////////////
--- ⚙️ MAIN CONFIGURATION ⚙️ ----------------------------
//////////////////////////////////////////////////////////
----------------------------------------------------------
|01| ➡️ npm init -y
----------------------------------------------------------
----------------------------------------------------------
|02| ➡️ npm i webpack 
----------------------------------------------------------
----------------------------------------------------------
|03| ➡️ npm i webpack-cli webpack-dev-server -D
----------------------------------------------------------
----------------------------------------------------------
|04| create src folder (❗do not change titles❗)
----------------------------------------------------------
----------------------------------------------------------
|05| create dist folder (❗do not change titles❗)
----------------------------------------------------------
----------------------------------------------------------
|06| create
	   - index.html
	   - index.js
	   - index.css
	  files in src folder
----------------------------------------------------------
----------------------------------------------------------
|07| create
		- script
		- style 
		- fonts
		- images
		- libs
 	  folders in src folder
----------------------------------------------------------
----------------------------------------------------------
|08| create [name].js file in js folder
----------------------------------------------------------
----------------------------------------------------------
|09| ➕ import [name].js to index.js ( require / import)
----------------------------------------------------------
----------------------------------------------------------
|10| create webpack.config.js file
----------------------------------------------------------
----------------------------------------------------------
|11| modify package.json scripts -

   "scripts": {
   	"start": "set NODE_ENV=development&&webpack serve",
   	"build-dev": "set NODE_ENV=development&&webpack",
   	"build-prod": "set NODE_ENV=production&&webpack"
   },
----------------------------------------------------------
----------------------------------------------------------
|12| ➕ import const path = require("path") in webpack.config.js
----------------------------------------------------------
----------------------------------------------------------
|13| configure webpack.config.js

 	const mode = process.env.NODE_ENV || "development";
	const devMode = mode === "development";
	const target = devMode ? "web" : "browserslist";
	const devtool = devMode ? "source-map" : undefined;
----------------------------------------------------------
----------------------------------------------------------
|14| configure webpack.config.js

   module.exports = {
		mode: mode,
		target: target,
		devtool: devtool,
		entry: path.resolve(__dirname, "src", "index.js"),
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "index.[contenthash].js",
			clean: true,
		},
	};
----------------------------------------------------------
----------------------------------------------------------
|15| create .browserslistrc file in root dir
----------------------------------------------------------
----------------------------------------------------------
|16| configure .browserslistrc file

	last 2 versions
	not dead 	
	> 0.5%			
----------------------------------------------------------
//////////////////////////////////////////////////////////
--- ⚙️ SERVER CONFIGURATION ⚙️ --------------------------
//////////////////////////////////////////////////////////
----------------------------------------------------------
|17| 
	devServer: {
		port: 3000,
		open: true,
		hot: true,
	},
----------------------------------------------------------
//////////////////////////////////////////////////////////
--- HTML CONFIGURATION -----------------------------------
//////////////////////////////////////////////////////////
----------------------------------------------------------
|18| configure HtmlWebpackPlugin

	➡️ npm install --save-dev html-webpack-plugin
	------------------------------------------

	🔝 const HtmlWebpackPlugin = require("html-webpack-plugin");

	module.exports = {
	mode: mode,
	target: target,
	devtool: devtool,
	entry: path.resolve(__dirname, "src", "index.js"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.[contenthash].js",
		clean: true,
	},
	⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
	plugins: [new HtmlWebpackPlugin()],
	⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️
	};
----------------------------------------------------------
----------------------------------------------------------
|19| set path to index.html (webpack.config.js)

	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html"),
		}),
	],
	
----------------------------------------------------------
----------------------------------------------------------
|20| configure html loader 

	➡️ npm install --save-dev html-loader
	--------------------------------------

	module.exports = {
	mode: mode,
	target: target,
	devtool: devtool,
	entry: path.resolve(__dirname, "src", "index.js"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.[contenthash].js",
		clean: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html"),
		}),
	],
	⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
		],
	},
	⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️
};
----------------------------------------------------------
----------------------------------------------------------
|21| ➕ import "./index.html" into index.js (start watching)
----------------------------------------------------------
//////////////////////////////////////////////////////////
--- ⚙️ CSS CONFIGURATION  ⚙️-----------------------------
//////////////////////////////////////////////////////////
----------------------------------------------------------
|22| configure css loader

 	➡️ npm install --save-dev css-loader
	➡️ npm install sass-loader sass webpack --save-dev
	➡️ npm install --save-dev style-loader
	➡️ npm install --save-dev postcss-loader postcss postcss-preset-env

	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
				],
			},
			⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️
		],
	},
----------------------------------------------------------
----------------------------------------------------------
|23| configure CssMinimizerWebpackPlugin

	➡️ npm install --save-dev mini-css-extract-plugin
	➡️ npm install css-minimizer-webpack-plugin --save-dev
	-------------------------------------------------------

	🔝 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
	🔝 const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

	module.exports = {
	mode: mode,
	target: target,
	devtool: devtool,
	entry: path.resolve(__dirname, "src", "index.js"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.[contenthash].js",
		clean: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html"),
		}),
		⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
		new MiniCssExtractPlugin({
			filename: "bundle.[contenthash].css",
		}),
		⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
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
			⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️
		],
	},
	⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin()],
	},
	⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️
};
----------------------------------------------------------
----------------------------------------------------------
|24| ➕ import "./index.css" into index.js (start watching)
----------------------------------------------------------
//////////////////////////////////////////////////////////
--- JS CONFIGURATION -------------------------------------
//////////////////////////////////////////////////////////
----------------------------------------------------------
|25| configure babel

	➡️ npm install -D babel-loader @babel/core @babel/preset-env webpack
	---------------------------------------------------------------------

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
			⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
			{
				test: /\.(?:js|mjs|cjs)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [["@babel/preset-env", { targets: "defaults" }]],
					},
				},
			},
			⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️
		],
----------------------------------------------------------
//////////////////////////////////////////////////////////
--- ⚙️ FONTS CONFIGURATION ⚙️ ---------------------------
//////////////////////////////////////////////////////////
----------------------------------------------------------
|26| add font rules

 	{
		test: /\.woff$/i,
		type: "asset/resource",
		generator: {
			filename: "assets/fonts/[name].[hash][ext]",
		},
	},
----------------------------------------------------------
----------------------------------------------------------
|27| ERROR FIXES

	1. BAD FONTS
	------------

	2.➡️ npm install --save-dev webpack
	---------------------------------
	3.➡️ npm rebuild node-sass
	------------------------

	4. ❗import problems:
	---------------------
	// [index].scss --> @use "..." (BETTER WAY)
	@font-face {
   	font-family: "Montserrat";
   	src: url("fonts/montserrat.woff") format("woff");
	}

	// [index].css --> import url(...)
	@font-face {
   	font-family: "Montserrat";
  		src: url("../fonts/montserrat.woff") format("woff");
	}
----------------------------------------------------------
//////////////////////////////////////////////////////////
--- ⚙️ IMAGES CONFIGURATION ⚙️ --------------------------
//////////////////////////////////////////////////////////
----------------------------------------------------------
|29| configure rules

	{
		test: /\.(jpe?g|webp|png|svg|gif)$/i,
		type: "asset/resource",
		generator: {
			filename: "assets/images/[name].[hash][ext]",
		},
	},

	--------------- 🔄️ OR 🔄️ --------------- 

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.[contenthash].js",
		assetModuleFilename: "assets/[name].[hash][ext]",
		clean: true,
	},
----------------------------------------------------------
----------------------------------------------------------
|29| correct path (relative)

	.image{
   	background-image: url("images/ararat.jpg");						
	}
----------------------------------------------------------
//////////////////////////////////////////////////////////
--- ⚙️ IMAGE OPTIMIZATION ⚙️ ----------------------------
//////////////////////////////////////////////////////////
----------------------------------------------------------
|30| image-webpack-loader

	➡️ npm i image-webpack-loader
	------------------------------

	{
		test: /\.(jpe?g|webp|png|svg|gif)$/i,
		type: "asset/resource",
		generator: {
			filename: "assets/images/[name].[hash][ext]",
		},
		⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
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
		⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️
	},
----------------------------------------------------------
//////////////////////////////////////////////////////////



