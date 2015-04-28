/**
 * Created by Dongbo on 4/26/15.
 */
angular.module('myApp', [])
    .controller('Ctrl',
    ['$timeout', '$rootScope', '$scope', '$log', '$translate', 'realTimeSimpleService', 'resizeGameAreaService',
    function ($timeout, $rootScope, $scope, $log, $translate, realTimeSimpleService, resizeGameAreaService) {
        'use strict';

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

            $scope.startGame();
            console.log('GameStarted');

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

        function sendEndGame(endMatchScores) {
            console.log("sending endMatch")
            realTimeSimpleService.endMatch(endMatchScores);
        }

        $scope.startGame = function () {
            window.gameStart();
        }


        $scope.highScore = function () {
            return $translate("HIGH_SCORE");
        }

        $scope.lastScore = function () {
            return $translate("LAST_SCORE");
        }

        $scope.endGame = function (endMatchScores) {
            gotEndMatch(endMatchScores)
        }

        $scope.sendEndGame = function (endMatchScores) {
            sendEndGame(endMatchScores);
        }

        function randomNumber() {
            var temp = randomService.randomFromTo(randomCount, 0, 1);
            $log.info("temp" + temp);
            randomCount++;
            return temp;
        }

        var randomCount = 0;
        $scope.random = function () {
            randomNumber();
            //var temp = randomService.randomFromTo(randomCount, 0, 1);
            //$log.info("temp"+temp);
            //randomCount++;
            //return temp;

        }


    }]);
