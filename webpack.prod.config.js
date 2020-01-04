const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: ["@babel/polyfill", "./src/public/index.js"]
  },
  output: {
    path: path.join(__dirname, "dist/public"),
    publicPath: "/",
    filename: "scripts/[name].js"
  },
  target: "web",
  devtool: "#source-map",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            esModule: false
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/public/index.html",
      filename: "index.html",
      excludeChunks: ["server"]
    }),
    new HtmlWebpackPlugin({
      template: "src/public/checkout.html",
      filename: "checkout.html",
      excludeChunks: ["server"]
    }),
    new HtmlWebpackPlugin({
      template: "src/public/product.html",
      filename: "product.html",
      excludeChunks: ["server"]
    }),
    new HtmlWebpackPlugin({
      template: "src/public/shopping_cart.html",
      filename: "shopping_cart.html",
      excludeChunks: ["server"]
    }),
    new HtmlWebpackPlugin({
      template: "src/public/single_page.html",
      filename: "single_page.html",
      excludeChunks: ["server"]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyPlugin([
      {
        from: "src/public/img/static",
        to: "img/static/[name].[ext]",
        toType: "template"
      }
    ])
  ]
};
