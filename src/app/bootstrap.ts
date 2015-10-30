import * as ng from 'angular';

import { Main } from './main';

ng.element(document).ready(() => {
	ng.bootstrap(document.documentElement, [Main.name], {
		strictDi: false
	});
});