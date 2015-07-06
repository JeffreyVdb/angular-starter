/*globals require: false */
'use strict';

import angular from 'angular';
import uiRouter from 'ui-router';

angular.module('starter.about', [uiRouter])
	.controller('AboutCtrl', $scope => {
		$scope.name = "about";
	})
	.config($stateProvider => {
		$stateProvider
	    .state('about', {
	      url: '/about',
	      template: require('./about.html'),
	      controller: 'AboutCtrl'
	    });
	});
