/**
 * Created by Wenzhao on 4/27/15.
 */
angular.module('myApp', [])
    .run(['$scope', 'randomService',
        function ($scope, randomService) {
        'use strict';

        var randomCount = 0;
         $scope.random = function () {
         var temp = randomService.randomFromTo(randomCount, 0, 1);
         $log.info("temp"+temp);
         randomCount++;
         return temp;

         }


    }]);