'use strict';

class HomeCtrl
{
  constructor($scope) {
    $scope.features = [
      {
        name: 'I18n',
        desc: 'Just some test content'
      },
      {
        name: 'Webpack',
        desc: 'An alternative to browserify.'
      }
    ];
  }
}

HomeCtrl.$inject = ['$scope'];

export default HomeCtrl;
