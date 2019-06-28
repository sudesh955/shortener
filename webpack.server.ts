import * as path from "path";
import NodemonPlugin from "nodemon-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";

const production = process.env.NODE_ENV === "production";

const config: Configuration = {
  mode: production ? "production" : "development",
  entry: "./server",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js",
    chunkFilename: production ? "[contenthash].js" : "[id].js"
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
                },
                corejs: 3,
                modules: false,
                useBuiltIns: "usage"
              }
            ],
            "@babel/preset-typescript"
          ]
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: ["node_modules", __dirname]
  },
  target: "node",
  watch: !production,
  plugins: [
    new NodemonPlugin(),
    new DefinePlugin({
      __DEV__: production ? "false" : "true"
    })
  ],
  stats: "errors-warnings",
  externals: {
    express: "commonjs express",
    sequelize: "commonjs sequelize"
  }
};

export default config;
