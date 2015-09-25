module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ['build']
        },
        jshint: {
            all: ['src/**/*.js', 'test/**/*.js']
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "build/<%= pkg.version %>/js/app.js": "src/js/app.js",
                    "build/<%= pkg.version %>/js/display.js": "src/js/display.js",
                    "build/<%= pkg.version %>/js/particle.js": "src/js/particle.js",
                    "build/<%= pkg.version %>/js/particlesystem.js": "src/js/particlesystem.js",
                    "build/<%= pkg.version %>/js/vector.js": "src/js/vector.js"
                }
            }
        },
        copy: {
            main: {
                files: [
                    {src: ['src/index.html'], dest: 'build/<%= pkg.version %>/index.html'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-copy');

    return grunt.registerTask('default', ['clean', 'babel', 'copy']);
};