/*globals require: false */
'use strict';

import angular from 'angular';
import uiRouter from 'ui-router';
import homeCtrl from './home.controller';

angular.module('starter.home', [uiRouter])
	.controller('HomeCtrl', homeCtrl)
	.config(homeConfig);

function homeConfig($stateProvider) {
	$stateProvider
    .state('home', {
      url: '/',
      template: require('./home.html'),
      controller: 'HomeCtrl'
    });
}
