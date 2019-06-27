import * as path from "path";
import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const production = process.env.NODE_ENV === "production";

const config: Configuration = {
  mode: production ? "production" : "development",
  entry: "./web",
  output: {
    publicPath: "/dist/",
    filename: "[name].js",
    path: path.resolve(__dirname, "./build"),
    chunkFilename: production ? "[contenthast].js" : "[id].js"
  },
  module: {
    rules: [
      {
        test: /.ts/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  node: "current"
                }
              }
            ],
            "@babel/preset-typescript",
            [
              "@babel/preset-react",
              {
                development: true
              }
            ]
          ],
          plugins: ["react-hot-loader/babel"]
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".json"],
    modules: ["node_modules", __dirname],
    alias: production ? {} : { "react-dom": "@hot-loader/react-dom" }
  },
  target: "web",
  watch: !production,
  plugins: [
    new HtmlWebpackPlugin({
      title: "App",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
      }
    }),
    new DefinePlugin({
      __DEV__: production ? "false" : "true"
    })
  ],
  devServer: {
    hot: true,
    noInfo: true,
    publicPath: "/dist/",
    contentBase: false,
    clientLogLevel: "error",
    port: parseInt(process.env.PORT || "3000"),
    proxy: {
      context: "/",
      target: "http://localhost:3001"
    }
  }
};

export default config;
