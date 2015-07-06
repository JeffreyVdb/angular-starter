/*globals require: false */
'use strict';

import angular from 'angular';
import uiRouter from 'ui-router';

angular.module('starter.home', [uiRouter])
	.controller('HomeCtrl', $scope => {
		$scope.features = [
			{
				name: 'I18n',
				desc: 'Translations and shit.. whoah ayyyyyyy lmaooooo'
			},
			{
				name: 'Webpack',
				desc: 'Some browserify replacer'
			}
		];
	})
	.config($stateProvider => {
		$stateProvider
	    .state('home', {
	      url: '/',
	      template: require('./home.html'),
	      controller: 'HomeCtrl'
	    });
	});
