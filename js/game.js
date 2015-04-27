/**
 * Created by Dongbo on 4/26/15.
 */
angular.module('myApp', [])
    .controller('Ctrl',
    function ($timeout, $rootScope, $scope, $log, realTimeSimpleService, resizeGameAreaService) {
        'use strict';

         console.log('shit1');
        resizeGameAreaService.setWidthToHeight(2);

        $scope.lines = [];
        var isOngoing = false;

        function gotStartMatch(params) {
            $log.info("gotStartMatch:", params);
            isOngoing = true;
            var yourPlayerIndex = params.yourPlayerIndex;
            var playersInfo = params.playersInfo;
            $scope.lines = [
                "yourPlayerIndex=" + yourPlayerIndex,
                "playersInfo:",
                angular.toJson(playersInfo)
            ];

            console.log('shit2');
            $scope.startGame();
            console.log('shit3');

            //$timeout(function () {
            //    if (!isOngoing) {
            //        return;
            //    }
            //    realTimeSimpleService.sendReliableMessage('Reliable');
            //    $timeout(function () {
            //        if (!isOngoing) {
            //            return;
            //        }
            //        realTimeSimpleService.sendUnreliableMessage('Unreliable');
            //        $timeout(function () {
            //            if (!isOngoing) {
            //                return;
            //            }
            //            var endMatchScores = [];
            //            for (var i = 0; i < playersInfo.length; i++) {
            //                endMatchScores.push(42 + i);
            //            }
            //            realTimeSimpleService.endMatch(endMatchScores);
            //        }, 1000);
            //    }, 1000);
            //}, 1000);
        }

        function gotMessage(params) {
            $log.info("gotMessage:", params);
            var fromPlayerIndex = params.fromPlayerIndex;
            var message = params.message;
            $scope.lines.push("msg=" + message + " from " + fromPlayerIndex);
        }

        function gotEndMatch(endMatchScores) {
            $log.info("gotEndMatch:", endMatchScores);
            isOngoing = false;
            $scope.lines.push("end match scores=" + endMatchScores);
        }

        realTimeSimpleService.init({
            gotStartMatch: gotStartMatch,
            gotMessage: gotMessage,
            gotEndMatch: gotEndMatch
        });

        $scope.startGame = function() { window.gameStart(); }
        $scope.endGame = function() { window.gameOver(); }



    });
