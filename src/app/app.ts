import * as ng from 'angular';

import config from 'app/config'

const app: ng.IModule = ng.module('ngp', [
	// Core
	'ngAnimate',
	'ngAria',
	'ngMaterial',
	'ngMessages',
	'ngTouch',
	// Config
	config.name
]);

export default app;