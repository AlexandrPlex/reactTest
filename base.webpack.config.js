"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "./client"),
    entry: "./index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.json?$/,
            use: "json-loader"
        }, {
            test: /\.tsx?$/,
            enforce: "pre",
            use: "tslint-loader"
        }, {
            test: /\.tsx?$/,
            use: "ts-loader"
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "less-loader"]
            })
        }, {
            test: /\.css$/,
            use: [
                 { loader: "style-loader" },
                 { loader: "css-loader" }
            ]
      }]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/public/index.html"
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.ProvidePlugin({
            Promise: "imports-loader?this=>global!exports-loader?global.Promise!bluebird"
        }),
    ]
};