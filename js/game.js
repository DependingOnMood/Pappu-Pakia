/**
 * Created by Dongbo on 4/26/15.
 */
angular.module('myApp', ['ngTouch', 'ui.bootstrap'])
    .controller('Ctrl',
    ['$timeout', '$rootScope', '$scope', '$log', '$translate', 'realTimeSimpleService', 'resizeGameAreaService','randomService',
    function ($timeout, $rootScope, $scope, $log, $translate, realTimeSimpleService, resizeGameAreaService, randomService) {
        'use strict';

        resizeGameAreaService.setWidthToHeight(2);

        $scope.lines = [];
        var isOngoing = false;
        var yourPlayerImage;//image name for different player
        var numOfPlayers;
        var finalEndMatchScores = [];
        var playerIndex;
        var randomCount = 0;

        function gotStartMatch(params) {
            $log.info("gotStartMatch:", params);
            isOngoing = true;
            randomCount = 0;
            var yourPlayerIndex = params.yourPlayerIndex;
            var playersInfo = params.playersInfo;

            numOfPlayers = playersInfo.length;
            playerIndex = yourPlayerIndex;
            finalEndMatchScores = [];

            for (var i = 0; i <= numOfPlayers - 1; i++){
                finalEndMatchScores.push(0);
            }

            yourPlayerImage = "pappu"+yourPlayerIndex+".png";

            //$scope.lines = [
            //    "yourPlayerIndex=" + yourPlayerIndex,
            //    "playersInfo:",
            //    angular.toJson(playersInfo)
            //];

            $scope.startGame();
            console.log('GameStarted');

        //    $timeout(function () {
        //        if (!isOngoing) {
        //            return;
        //        }
        //        realTimeSimpleService.sendReliableMessage('Reliable');
        //        $timeout(function () {
        //            if (!isOngoing) {
        //                return;
        //            }
        //            realTimeSimpleService.sendUnreliableMessage('Unreliable');
        //            $timeout(function () {
        //                if (!isOngoing) {
        //                    return;
        //                }
        //                var endMatchScores = [];
        //                for (var i = 0; i < playersInfo.length; i++) {
        //                    endMatchScores.push(42 + i);
        //                }
        //                realTimeSimpleService.endMatch(endMatchScores);
        //            }, 1000);
        //        }, 1000);
        //    }, 1000);

        }

        function gotMessage(params) {
            $log.info("gotMessage:", params);
            var fromPlayerIndex = params.fromPlayerIndex;
            var message = params.message;
            finalEndMatchScores = message.split(',').map(Number);
            console.log("finalEndMatchScores in gotMessage:",finalEndMatchScores);
            //$scope.lines.push("msg=" + message + " from " + fromPlayerIndex);
        }

        function gotEndMatch(endMatchScores) {
            $log.info("gotEndMatch:", endMatchScores);
            isOngoing = false;
            //$scope.lines.push("end match scores=" + endMatchScores);
        }

        realTimeSimpleService.init({
            gotStartMatch: gotStartMatch,
            gotMessage: gotMessage,
            gotEndMatch: gotEndMatch
        });

        function sendEndGame(finalEndMatchScores) {
            console.log("sending endMatch:", finalEndMatchScores);
            realTimeSimpleService.endMatch(finalEndMatchScores);
        }

        $scope.startGame = function () {
            window.gameStart();
        }


        $scope.endGame = function (endMatchScores) {
            //gotEndMatch(endMatchScores);
            finalEndMatchScores[playerIndex]= endMatchScores;
            realTimeSimpleService.sendReliableMessage(finalEndMatchScores.toString());
            console.log("finalEndMatchScores:",finalEndMatchScores);

            if (checkAllGameEnded(finalEndMatchScores)) {
                sendEndGame(finalEndMatchScores);
                //finalEndMatchScores = [];
                //console.log("finalEndMatchScores to zero:",finalEndMatchScores);
            }
        }

        function checkAllGameEnded(finalEndMatchScores){
            for (var i = 0; i <= numOfPlayers - 1; i++){
                if (finalEndMatchScores[i] === 0){return false;}
            }
            return true;
        }

        $scope.sendEndGame = function (endMatchScores) {
            sendEndGame(endMatchScores);
        }

        $scope.getPlayerImage = function (){
            //console.log("getPlayerImage", yourPlayerImage);
            return yourPlayerImage;
        }


        $scope.highScore = function () {
            return $translate("HIGH_SCORE");
        }

        $scope.lastScore = function () {
            return $translate("LAST_SCORE");
        }


        $scope.random = function () {
            //randomNumber();

            var temp = randomService.random(randomCount);
            //$log.info("temp" + temp);
            randomCount++;
            return temp;
            //var temp = randomService.randomFromTo(randomCount, 0, 1);
            //$log.info("temp"+temp);
            //randomCount++;
            //return temp;

        }


    }]);
