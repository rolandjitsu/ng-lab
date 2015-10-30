import * as ng from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-touch';
import 'angular-ui-router';

import {
	App,
	Experiments,
	Home
} from './components';

const CORE_COMPONENTS = [
	// Core Angular
	'ngAnimate',
	'ngAria',
	'ngMaterial',
	'ngMessages',
	'ngSanitize',
	'ngTouch',
	// 3rd Party
	'ui.router'
];

const APP_COMPONENTS = [
	App.name,
	Experiments.name,
	Home.name
];

export const Main = ng.module('nglab', [].concat.apply([], [
	CORE_COMPONENTS,
	APP_COMPONENTS
]));

Main.config(($compileProvider, $httpProvider, $locationProvider, $mdThemingProvider, $mdIconProvider, $urlRouterProvider) => {
		
	// For any unmatched url, redirect to '/'
	$urlRouterProvider.otherwise("/");
	
	// Production
	if (false) $compileProvider.debugInfoEnabled(false); // https://docs.angularjs.org/guide/production
	$httpProvider.useApplyAsync(true); // http://blog.thoughtram.io/angularjs/2015/01/14/exploring-angular-1.3-speed-up-with-applyAsync.html
	
	// Routing
	$locationProvider
		.html5Mode(false)
		.hashPrefix('!');

	// Material
	$mdThemingProvider.theme('default')
});