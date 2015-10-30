import autoprefixer from 'gulp-autoprefixer';
import bower from 'bower';
import changed from 'gulp-changed';
import connect from 'gulp-connect';
import del from 'del';
import gulp from 'gulp';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import tslint from 'gulp-tslint';
import tsd from 'tsd';
import ts from 'gulp-typescript';
import watch from 'gulp-watch';

const NG_LAB_TS_PROJECT = ts.createProject('tsconfig.json');

const LAB_WEB_SERVER_PORT = 8080;

const PATHS = {
	lib: [
		'node_modules/systemjs/dist/system.*',
		'node_modules/es6-shim/es6-shim.*',
		'bower_components/angular/angular.js',
		'bower_components/angular-animate/angular-animate.js',
		'bower_components/angular-aria/angular-aria.js',
		'bower_components/angular-material/angular-material.*',
		'bower_components/angular-messages/angular-messages.js',
		'bower_components/angular-sanitize/angular-sanitize.js',
		'bower_components/angular-touch/angular-touch.js',
		'bower_components/angular-ui-router/release/angular-ui-router.*',
		'bower_components/normalize-css/normalize.css'
	],
	typings: ['tsd_typings/tsd.d.ts'],
	src: {
		root: '/src',
		ts: ['src/**/*.ts'],
		html: 'src/**/*.html',
		scss: [
			'!src/app/vars.scss',
			'!src/app/mixins.scss',
			'src/**/*.scss'
		],
		static: 'src/**/*.{svg,jpg,png,ico}'
	},
	dist: 'dist'
};


// Clean
gulp.task('clean', (done) => {
	del([PATHS.dist]).then(() => {
		done();
	});
});


// Dependecies

gulp.task('install/bower', (done) => {
	bower
		.commands
		.install(null, { save: true }, { interactive: false })
		.on('error', console.error.bind(console))
		.on('end', () => {
			done();
		});
});

gulp.task('install/tsd', () => {
	let config = './tsd.json';
	let api = tsd.getAPI(config);
	return api.readConfig(config, true).then(() => {
		let opts = tsd.Options.fromJSON(); // https://github.com/DefinitelyTyped/tsd/blob/bb2dc91ad64f159298657805154259f9e68ea8a6/src/tsd/Options.ts
		let query = new tsd.Query();
		opts.saveBundle = true;
		opts.overwriteFiles = true;
		opts.resolveDependencies = true;
		api.context.config.getInstalled().forEach((install) => {
			let def = tsd.Def.getFrom(install.path);
			query.addNamePattern(`${def.project}/${def.name}`);
		});
		query.versionMatcher = new tsd.VersionMatcher('latest');
		return api.select(query, opts).then((selection) => {
			return api.install(selection, opts);
		});
		return api.reinstall(opts);
	});
});

gulp.task('deps', ['install/bower', 'install/tsd'], () => {
	let libsPath = `${PATHS.dist}/lib`;
	return gulp
		.src(PATHS.lib)
		.pipe(changed(libsPath))
		.pipe(size({
			showFiles: true,
			gzip: true
		}))
		.pipe(gulp.dest(libsPath));
});


// Build

gulp.task('build/js', (done) => {
	return gulp
		.src(PATHS.src.ts.concat(PATHS.typings)) // instead of gulp.src(...), project.src() can be used
		.pipe(changed(PATHS.dist, { extension: '.js' }))
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(ts(NG_LAB_TS_PROJECT))
		.js
		.pipe(sourcemaps.write('.'))
		.pipe(size({
			showFiles: true,
			gzip: true
		}))
		.pipe(gulp.dest(PATHS.dist));
});

gulp.task('serve/html', () => {
	return gulp
		.src(PATHS.src.html)
		.pipe(changed(PATHS.dist))
		.pipe(size({
			showFiles: true,
			gzip: true
		}))
		.pipe(gulp.dest(PATHS.dist));
});

gulp.task('build/css', () => {
	let sassConfig = {
		includePaths: [
			`${PATHS.src.root}/app`
		],
		outputStyle: 'compressed', // nested (default), expanded, compact, compressed
		indentType: 'tab',
		indentWidth: 1,
		linefeed: 'lf'
	};
	return gulp
		.src(PATHS.src.scss)
		.pipe(changed(PATHS.dist, { extension: '.css' }))
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass(sassConfig).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(size({
			showFiles: true,
			gzip: true
		}))
		.pipe(gulp.dest(PATHS.dist));
});

gulp.task('serve/static', () => {
	return gulp
		.src(PATHS.src.static)
		.pipe(changed(PATHS.dist))
		.pipe(size({
			showFiles: true,
			gzip: true
		}))
		.pipe(gulp.dest(PATHS.dist));
});

gulp.task('build', (done) => {
	runSequence('deps', ['build/js', 'serve/html', 'build/css', 'serve/static'], done);
});


// Code integrity
gulp.task('lint', () => { // https://github.com/palantir/tslint#supported-rules
	return gulp
		.src(PATHS.src.ts)
		.pipe(plumber())
		.pipe(tslint())
		.pipe(tslint.report('verbose', {
			summarizeFailureOutput: true,
			emitError: true
		}));
});


// Web server
gulp.task('server', (done) => {
	createWebServer();
});


// Lab
gulp.task('start', ['build'], (done) => {
	runSequence('server');
	gutil.log(gutil.colors.green('File watch processes for HTML, CSS & static assets started'));
	watch(PATHS.src.static, () => {
		runSequence('serve/static');
	});
	watch(PATHS.src.html, () => {
		runSequence('serve/html');
	});
	watch(PATHS.src.ts, () => {
		runSequence('build/js');
	});
	watch(PATHS.src.scss, () => {
		runSequence('build/css');
	});
});


// Default task
gulp.task('default', [
	'start'
]);


function createWebServer () {
	connect.server({
		root: PATHS.dist,
		port: LAB_WEB_SERVER_PORT
	});
}