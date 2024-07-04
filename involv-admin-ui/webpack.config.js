const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const DotEnv = require("dotenv-webpack");
const deps = require("./package.json").dependencies;
//const path = require('path');

module.exports = (env) => {
    return {
        output: {
            // path: path.resolve(__dirname, '..', 'build'),
            publicPath: "/",
        },
        resolve: {
            extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
        },

        devServer: {
            port: process.env.PORT,
            historyApiFallback: true,
        },
        // devtool: "eval-cheap-source-map",
        module: {
            rules: [
                {
                    test: /\.m?js/,
                    type: "javascript/auto",
                    resolve: {
                        fullySpecified: false,
                    },
                },
                {
                    test: /\.(css|s[ac]ss)$/i,
                    use: ["style-loader", "css-loader", "postcss-loader"],
                },
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
            ],
        },

        plugins: [
            new DotEnv({
                path: `./.env${env.file ? `.${env.file}` : ""}`,
            }),
            new ModuleFederationPlugin({
                name: "involv_admin_ui",
                filename: "remoteEntry.js",
                remotes: {},
                exposes: {},
                shared: {
                    ...deps,
                    react: {
                        singleton: true,
                        requiredVersion: deps.react,
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: deps["react-dom"],
                    },
                },
            }),
            new HtmlWebPackPlugin({
                template: "./src/index.html",
            }),
        ],
    };
};
