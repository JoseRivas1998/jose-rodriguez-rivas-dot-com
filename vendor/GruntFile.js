module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            dist: {
                files: {
                    "../app/styles/main.css": "../app/styles/main.less"
                }
            }
        },
        concat: {
            js: {
                src: [
                    "bower_components/angular/angular.min.js",
                    "bower_components/angular-route/angular-route.min.js",
                    "bower_components/angular-sanitize/angular-sanitize.min.js",
                    "bower_components/angular-recaptcha/release/angular-recaptcha.min.js",
                    "bower_components/jquery/dist/jquery.min.js",
                    "bower_components/moment/min/moment.min.js",
                    "bower_components/plyr/dist/plyr.min.js",
                    "bower_components/bootstrap/dist/js/bootstrap.min.js",
                    "bower_components/ng-file-upload/ng-file-upload-all.min.js",
                    // THIRD PARTY ABOVE THIS LINE
                    "../app/tcg.js",
                    "../app/controllers/**/**.js"
                ],
                dest: "../js/app.js"
            },
            css: {
                src: [
                    "bower_components/bootstrap/dist/css/bootstrap.min.css",
                    "bower_components/components-font-awesome/css/font-awesome.min.css",
                    "bower_components/plyr/dist/plyr.css",
                    // THIRD PARTY ABOVE THIS LINE
                    "../app/styles/main.css"
                ],
                dest: "../css/app.css"
            }
        },
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'bower_components/bootstrap/fonts/**',
                            'bower_components/components-font-awesome/fonts/**'
                        ],
                        dest: '../fonts/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            build: {
                files: {
                    '../js/app.min.js': ['../js/app.js']
                }
            }
        },
        cssmin: {
            build: {
                src: '../css/app.css',
                dest: '../css/app.min.css'
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('dist', ['less', 'concat', 'copy', 'uglify', 'cssmin']);
};
