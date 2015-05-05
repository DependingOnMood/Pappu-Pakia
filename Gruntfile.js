module.exports = function (grunt) {

    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                strict: true,
                undef: true,
                unused: true,
                bitwise: true,
                forin: true,
                freeze: true,
                latedef: true,
                noarg: true,
                nocomma: true,
                nonbsp: true,
                nonew: true,
                notypeof: true,
                singleGroups: true,
                jasmine: true,
                jquery: true,
                globals: {
                    module: false, // for Gruntfile.js
                    exports: false, // for protractor.conf.js
                    inject: false, // testing angular
                    angular: false,
                    console: false,
                    browser: false, element: false, by: false // Protractor
                }
            },
            all: [
                'Gruntfile.js',
                //'karma.conf.js',
                //'protractor.conf.js',
                //'src/*.js'
            ]
        },
        //karma: {
        //  unit: {
        //    configFile: 'karma.conf.js',
        //    background: true,
        //    singleRun: false
        //  }
        //},
        // Run karma and watch files using:
        // grunt karma:unit:start watch
        //watch: {
        //  files: ['src/*.js'],
        //  tasks: ['jshint', 'karma:unit:run']
        //},
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                // Order is important! gameLogic.js must be first because it defines myApp angular module.
                src: [
                    //'src/gameLogic.js',
                    'js/game.js',
                    //'src/aiService.js'
                ],
                dest: 'dist/controller.js'
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            my_target: {
                files: {
                    'dist/controller.min.js': ['dist/controller.js']
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'game.min.html': ['game.html']
                }
            }
        },
        manifest: {
            generate: {
                options: {
                    basePath: '.',
                    cache: [
                        'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min.js',
                        'http://cdnjs.cloudflare.com/ajax/libs/seedrandom/2.3.11/seedrandom.min.js',
                        'http://yoav-zibin.github.io/emulator/main.css',
                        'dist/controller.min.js',
                        'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-touch.min.js',
                        'http://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.12.1/ui-bootstrap-tpls.min.js',
                        'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css',
                        'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.woff',
                        'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/fonts/glyphicons-halflings-regular.ttf',
                        'http://yoav-zibin.github.io/emulator/dist/realTimeSimpleServices.2.min.js',
                        "http://code.jquery.com/jquery-1.8.2.min.js",
                        "js/utils.js",
                        "js/backgrounds.js",
                        "js/forks.js",
                        "js/branches.js",
                        "js/collectibles.js",
                        "js/pappu.js",
                        "js/pakia.js",
                        "js/main.js",
                        "js/loader.js",
                        'css/game.css',
                        'res/angry_pakia.png',
                        'res/apple.png',
                        'res/back_trees.png',
                        'res/berries.png',
                        'res/bg_combined.png',
                        'res/branch.png',
                        'res/clouds.png',
                        'res/coins.png',
                        'res/coins_old.png',
                        'res/controls.png',
                        'res/dig.png',
                        'res/fork_handle.png',
                        'res/fork_head.png',
                        'res/front_trees.png',
                        'res/grass.png',
                        'res/ground.png',
                        'res/happy_pakia.png',
                        'res/log.png',
                        'res/mute.png',
                        'res/pappu.png',
                        'res/plank_bot.png',
                        'res/plank_mid.png',
                        'res/plank_top.png',
                        'res/sad_pakia.png',
                        'res/stand.png',
                        'res/star.png',
                        'res/Thumbs.db',
                        'languages/en.js',
                        'languages/zh.js',
                        'fonts/happy_sans-webfont.svg',
                        'sound/flap.mp3',
                        'sound/flap.ogg',
                        'sound/jump1.mp3',
                        'sound/jump1.ogg',
                        'sound/jump2.mp3',
                        'sound/jump2.ogg',
                        'sound/jump3.mp3',
                        'sound/jump3.ogg',
                        'sound/pappu-pakia2.3.mp3',
                        'sound/pappu-pakia2.3.ogg',
                        'sound/ting.mp3',
                        'sound/ting.ogg',
                        "imgs/HelpSlide1.png",
                        "imgs/HelpSlide2.png",
                        "imgs/HelpSlide3.png"
                    ],
                    network: ['dist/controller.min.js.map', 'dist/controller.js'],
                    timestamp: true
                },
                dest: 'game.appcache',
                src: []
            }
        },
        'http-server': {
            'dev': {
                // the server root directory
                root: '.',
                port: 9000,
                host: "0.0.0.0",
                cache: 1,
                showDir: true,
                autoIndex: true,
                // server default file extension
                ext: "html",
                // run in parallel with other tasks
                runInBackground: true
            }
        }
        //protractor: {
        //  options: {
        //    configFile: "protractor.conf.js", // Default config file
        //    keepAlive: true, // If false, the grunt process stops when the test fails.
        //    noColor: false, // If true, protractor will not use colors in its output.
        //    args: {
        //      // Arguments passed to the command
        //    }
        //  },
        //  all: {}
        //}
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-manifest');
    grunt.loadNpmTasks('grunt-http-server');
    //grunt.loadNpmTasks('grunt-protractor-runner');

    // Default task(s).
    grunt.registerTask('default', ['jshint',
        //'karma',
        'concat', 'uglify',
        'processhtml', 'manifest',
        'http-server',
        //'protractor'
    ]);

};