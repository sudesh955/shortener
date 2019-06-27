import * as path from "path";
import NodemonPlugin from "nodemon-webpack-plugin";
import { Configuration } from "webpack";

const production = process.env.NODE_ENV === "production";

const config: Configuration = {
  mode: production ? "production" : "development",
  entry: "./server",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js"
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
            "@babel/preset-typescript"
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: ["node_modules", __dirname]
  },
  target: "node",
  watch: !production,
  plugins: [new NodemonPlugin()],
  stats: "errors-warnings"
};

export default config;
