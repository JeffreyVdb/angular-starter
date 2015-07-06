/*globals require: false, process: false, __dirname: false */
'use strict';

import _ from 'lodash';
import path from 'path';
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import runSequence from 'run-sequence';
import ngAnnonatePlugin from 'ng-annotate-webpack-plugin';

const APP_BASE = path.join(__dirname, 'app');
const ENV_PROD = 'production';
const ENV_DEV = 'development';
const $ = loadPlugins();
const PROJECT_NAME = "Angular Starter";
const WEBPACK_CONFIG = require('./webpack.config.js');
const SERVER_PORT = 1337;
const ENV = process.env.NODE_ENV || $.util.env.environment || ENV_DEV;

// Helpers
var onProduction = (callback) => ENV === ENV_PROD ? callback() : $.util.noop();

$.util.log(`

	${PROJECT_NAME} gulpfile
	Environment: ${ENV}
	_______________________________________

`);

// TODO: Make this a constant
function webpackConfig() {
	let initialConfig = WEBPACK_CONFIG;
	let cfg;
	if (ENV === ENV_DEV) {
		cfg = {
			devtool: 'eval',
			debug: true,
			plugins: [
				new webpack.HotModuleReplacementPlugin()
			]
		};
	}
	else if (ENV === ENV_PROD) {
		initialConfig.plugins.push(
			new webpack.DefinePlugin({
				"process.env": {
					"NODE_ENV": JSON.stringify(ENV)
				}
			}),
			new ngAnnonatePlugin({
				add: true,
				regexp: /^\s*_?angular.*/ 	// Make sure we can find webpack imports
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin()
		);
		cfg = {
			debug: false,
		};
	}

	return _.merge(initialConfig, cfg);
}

function runWebpack(config, cb) {
	let colors = true;

	if (! cb) {
		return webpack(config);
	}
	else {
		return webpack(config, (err, stats) => {
			if (err) {
				throw new $.util.PluginError("webpack-dev-server", err);
			}

			$.util.log("[webpack-dev-server]", stats.toString({ colors }));
			cb();
		});
	}
}

gulp.task('html', () => {
	const assets = $.useref.assets({ searchPath: '{.tmp,app}' });

	return gulp.src('app/**/*.html')
		.pipe(assets)
		// Remove any unused CSS
		// Note: If not using the Style Guide, you can delete it from
		// the next line to only include styles your project uses.
		.pipe(onProduction(() => $.if('*.css', $.uncss({
			html: [
				'app/index.html'
			]
		}))))

		// Concatenate and minify styles
		// In case you are still using useref build blocks
		.pipe(onProduction(() => $.if('*.css', $.minifyCss())))
		.pipe(assets.restore())
		.pipe($.useref())

		// Minify any HTML
		.pipe(onProduction(() => $.if('*.html', $.minifyHtml())))
		// Output files
		.pipe(gulp.dest('dist'))
		.pipe($.size({ title: 'html' }));
});


gulp.task('webpack:build', cb => runWebpack(webpackConfig(), cb));
gulp.task('webpack:server', () => {
	let config = webpackConfig();
	let server = new WebpackDevServer(runWebpack(config), {
		contentBase: './' + config.output.publicPath,
		publicPath: '/',
		stats: { colors: true },
		hot: true
	});

	server.listen(SERVER_PORT, 'localhost', err => {
		if (err) {
			throw new $.util.PluginError("webpack-dev-server", err);
		}

		$.util.log("[webpack-dev-server]", `http://localhost:${SERVER_PORT}/webpack-dev-server/`);
	});

	// gulp.watch('./app/**/*.html', 'html');
});

gulp.task('build', cb => runSequence(['html', 'webpack:build'], cb));
gulp.task('default', () => runSequence('html', 'webpack:server'));
