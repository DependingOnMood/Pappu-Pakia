(function () {

    window.utils = window.utils || {};

    /*
     Random Number Generator.

     Pretty awesome explanation here:
     http://stackoverflow.com/a/1527820
     */
    utils.randomNumber = function (min, max) {
        //return Math.floor(utils.random() * (max - min + 1)) + min;
        //return Math.floor(Math.random() * (max - min + 1)) + min;
        //var scope = angular.element(document.getElementById("mainCtrl")).scope();
        //return Math.floor(scope.random() * (max - min + 1)) + min;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    utils.random = function () {
        return (Date.now() % 100) / 100.00
    }

    utils.isInt = function (number) {
        return parseFloat(number) === parseInt(number);
    };

    utils.toRadian = function (degree) {
        return (degree * 3.1415926 / 180);
    };

    utils.toDegree = function (radian) {
        return (radian * 180 / 3.1415926);
    };

    utils.intersect = function (bounds1, bounds2) {

        return !(
        bounds1.end_x < bounds2.start_x ||
        bounds2.end_x < bounds1.start_x ||
        bounds1.end_y < bounds2.start_y ||
        bounds2.end_y < bounds1.start_y
        );

    };

}());