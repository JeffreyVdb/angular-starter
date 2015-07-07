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
        desc: 'Some browserify replacer'
      }
    ];
  }
}

HomeCtrl.$inject = ['$scope'];

export default HomeCtrl;
