# AngularJS Laboratory

[![Dependency Status](https://gemnasium.com/rolandjitsu/ng-lab.svg)](https://gemnasium.com/rolandjitsu/ng-lab)
[![Join the chat at https://gitter.im/rolandjitsu/ng-lab](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/rolandjitsu/ng-lab)
> Playground for experimenting with some of the core features of [AngularJS](https://angularjs.org) and integration with other software and services.

# IMPORTANT NOTICE

This project is no longer maintained and it's definitely out of date! Use at your own risk!

# Setup

This setup is using:
* [TypeScript](http://www.typescriptlang.org)
* [ES6 Shim](https://github.com/paulmillr/es6-shim) - necessary for browsers that haven't implemented any or some of the [ES6](http://es6-features.org) features
* [SystemJS](https://github.com/systemjs/systemjs) - loading the compiled (`.ts` -> `.js`) source files in the browser
* [Angular UI Router](https://github.com/angular-ui/ui-router) - app routing
* [Angular Material](https://material.angularjs.org) - UI


# Table of Contents

* [Setup](#setup)
* [Running Tests](#running-tests)
* [Learning Material](#learning-material)


### Setup
---------
Clone/Download this repo and setup the following tools on your machine:

* [Node](http://nodejs.org) (*if not already installed*)
* [Gulp](http://gulpjs.com/) (*optional*)

After you have the above tools setup, install all runtime/dev dependencies by running:

```shell
$(node bin)/npm install
```

Now start the webserver and the build process (runs on file change) and navigate to [localhost:8080](http://localhost:8080):

```shell
$(npm bin)/npm start # `$(npm bin)/gulp start`
```


### Running Tests
-----------------
At the moment there are no tests implemented, but you can at least check the code integrity:
* `$(npm bin)/gulp lint`: runs [tslint](http://palantir.github.io/tslint/) and checks all `.ts` files according to the `tslint.json` rules file


### Learning Material
---------------------
* [AngularJS Learning](https://github.com/jmcunningham/AngularJS-Learning)
* [UI Router](https://github.com/angular-ui/ui-router/wiki)