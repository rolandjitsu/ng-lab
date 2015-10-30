import * as ng from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-touch';
import 'angular-ui-router';

export const App = ng.module('nglab.app', [
	// Core Angular
	'ngAnimate',
	'ngAria',
	'ngMaterial',
	'ngTouch',
	// 3rd Party
	'ui.router'
]);

App.config(($stateProvider) => {
	// Routing
	$stateProvider
		.state('index', {
			url: '',
			views: {
				main: {
					templateUrl: 'app/components/app/app.html',
					controller: AppController,
					controllerAs: 'app'
				}
			}
		});
});

class AppController {
	constructor(private $mdSidenav) {}
	toggleSidenav(menuId) {
		const $mdSidenav = this.$mdSidenav; 
		$mdSidenav(menuId).toggle();
	};
}