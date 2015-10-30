import * as ng from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-touch';
import 'angular-ui-router';

export const Experiments = ng.module('nglab.app.experiments', [
	// Core Angular
	'ngAnimate',
	'ngAria',
	'ngMaterial',
	'ngTouch',
	// 3rd Party
	'ui.router'
]);

Experiments.config(($stateProvider) => {
	// Routing
	$stateProvider
		.state('index.experiments', {
			url: '/experiments',
			views: {
				content: {
					templateUrl: 'app/components/experiments/experiments.html',
					controller: ExperimentsController,
					controllerAs: 'experiments'
				}
			}
		});
});

class ExperimentsController {
	constructor() {}
}