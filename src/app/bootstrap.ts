import * as ng from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-messages';
import 'angular-touch';
import 'firebase';

import app from 'app/app';

ng.element(document).ready(() => {
	ng.bootstrap(document.documentElement, [app.name], {
		strictDi: true
	});
});