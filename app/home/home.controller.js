'use strict';

function homeCtrl($scope) {
  $scope.features = [
    {
      name: 'I18n',
      desc: 'Translations and shit.. whoah ayyyyyyy lmaooo xD'
    },
    {
      name: 'Webpack',
      desc: 'Some browserify replacer'
    }
  ];
}

homeCtrl.$inject = ['$scope'];

export default homeCtrl;
