import * as ng from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-touch';
import 'angular-ui-router';

export const Home = ng.module('nglab.app.home', [
	// Core Angular
	'ngAnimate',
	'ngAria',
	'ngMaterial',
	'ngTouch',
	// 3rd Party
	'ui.router'
]);

Home.config(($stateProvider) => {
	// Routing
	$stateProvider
		.state('index.home', {
			url: '/',
			views: {
				content: {
					templateUrl: 'app/components/home/home.html',
					controller: HomeController,
					controllerAs: 'home'
				}
			}
		});
});

class HomeController {
	constructor() {}
}