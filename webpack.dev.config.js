const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[ext]",
              useRelativePath: true,
              esModule: false
            }
          }
        ]
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
    new CopyPlugin([
      {
        from: 'src/public/img/static',
        to: 'img/static/[name].[ext]',
        toType: 'template'
      }
    ])
  ]
};
