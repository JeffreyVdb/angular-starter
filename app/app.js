'use strict';

// Load angular
import angular from 'angular';
import uiRouter from 'ui-router';

import './about';
import './home';

// Require
angular.module('starter', [
    uiRouter,
    'starter.about',
    'starter.home'
  ])
  .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  })
  .controller('MainCtrl', $scope => {
    $scope.people = [
      'john', 'peter', 'bart', 'pen1'
    ];
  });
