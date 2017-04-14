'use strict';

const path = require('path');
const BowerWebpackPlugin = require('bower-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './index',
    output: {
        path: path.join(__dirname, 'output'),
        filename: "main.js"
    },
    watch: true,

    // provide decomposition of js file in browser debugger
    devtool: "source-map",

    module:{
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }

        ],
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ]
};

