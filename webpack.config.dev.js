'use strict';

var path = require('path');
var BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './app',
    output: {
        path: path.join(__dirname, 'output'),
        filename: "main.js"
    },
    watch: true

};