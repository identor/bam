module.exports = function (grunt) {

  grunt.initConfig({

    watch: {
      files: [ '**/**' ],
      tasks: [ 'jshint', 'mochaTest' ],
      options: {
        livereload: true
      }
    },

    jshint: {
      options: {
        'node': true,
        'esnext': true
      },
      all: ['bam.js', 'Gruntfile.js']
    },

    connect: {
      server: {
        options: {
          open: true,
          port: 8090,
          base: '.tmp'
        }
      }
    },

    clean: ['.tmp/'],
    copy: {
      main: {
        expand: true,
        dot: true,
        cwd: 'src',
        dest: '.tmp',
        src: [
          '**/*'
        ]
      }
    },

    tags: {
      build: {
        src: [
          '.tmp/**/*.js',
        ],
        dest: '.tmp/index.html'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-script-link-tags');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('build', ['clean', 'copy', 'tags']);
  grunt.registerTask('serve', ['jshint', 'build', 'connect:server', 'watch']);
  grunt.registerTask('default', ['watch', 'jshint']);
  grunt.registerTask('script:watch', ['watch']);

};