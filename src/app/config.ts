import * as ng from 'angular';

configFn.$inject = [
	'$compileProvider',
	'$httpProvider',
	'$locationProvider',
	'$mdThemingProvider',
	'$mdIconProvider'
];

function configFn ($compileProvider, $httpProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
	
	// Production
	if (false) $compileProvider.debugInfoEnabled(false); // https://docs.angularjs.org/guide/production
	$httpProvider.useApplyAsync(true); // http://blog.thoughtram.io/angularjs/2015/01/14/exploring-angular-1.3-speed-up-with-applyAsync.html
	
	// Navigation
	$locationProvider
		.html5Mode(false)
		.hashPrefix('!');
		
	// Material theme
	$mdThemingProvider
			.theme('default')
}

const config: ng.IModule = ng
	.module('ngp.config', [])
	.config(configFn);

export default config;