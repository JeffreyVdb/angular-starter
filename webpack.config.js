/*globals __dirname: false, module: false, require: false */
'use strict';

var path = require('path');
var DIST_BASE = path.join(__dirname, 'dist');
// var APP_BASE = path.join(__dirname, 'app');

module.exports = {
	cache: true,
	context: path.join(__dirname, 'app'),
	entry: {
			app: './app.js'
	},
	output: {
		path: DIST_BASE,
		publicPath: 'dist/',
		filename: '[name].bundle.js'
	},
	plugins: [],
	module: {
		loaders: [
			// TODO: figure out how to use ngTemplateCache instead.
			{
				test: /\.html$/,
				loader: "html"
			},
	    {
      	test: /\.js$/,
      	exclude: /(node_modules|bower_components)/,
      	loader: 'babel'
    	}
  	]
	}
};
