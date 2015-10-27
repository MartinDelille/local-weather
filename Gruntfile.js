module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-bootlint');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-webdriver');

  grunt.registerTask('build', ['wiredep', 'jade']);
  grunt.registerTask('lint', ['jshint', 'htmlhint', 'htmllint', 'csslint', 'bootlint']);
  grunt.registerTask('serve', ['build', 'lint', 'connect:livereload', 'webdriver', 'watch']);
  grunt.registerTask('test', ['build', 'lint', 'connect:test', 'webdriver']);

  var port = 9000;
  var jsFiles = ['Gruntfile.js', 'js/*.js', 'features/*.js'];
  var htmlFiles = ['*.html'];
  var cssFiles = ['css/*.css'];

  grunt.initConfig({
    connect: {
      livereload: {
        options: {
          port: port,
          open: true,
          livereload: port + 1
        }
      },
      test: {
        options: {
          port: port
        }
      }
    },

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      html: {
        files: htmlFiles,
        tasks: ['htmlhint', 'htmllint', 'bootlint']
      },
      js: {
        files: jsFiles,
        tasks: ['jshint']
      },
      css: {
        files: ['css/*.css'],
        tasks: ['csslint']
      },
      jade: {
        files: ['*.jade'],
        tasks: ['jade']
      },
      features: {
        files: ['features/*.feature'],
        tasks: ['webdriver']
      },
      options: {
        livereload: port + 1,
      },
    },

    wiredep: {
      all: {
        src: [
          'index.html',
          'index.jade'
        ]
      }
    },

    jshint: {
      all: jsFiles
    },

    htmlhint: {
      all: {
        options: {
          "tag-pair": true
        },
        src: htmlFiles
      }
    },

    htmllint: {
      all: htmlFiles
    },

    csslint: {
      all: cssFiles
    },

    bootlint: {
      src: htmlFiles
    },

    jade: {
      all: {
        options: {
          pretty: true
        },
        files: {
          'index.html': 'index.jade'
        }
      }
    },

    webdriver: {
      test: {
        configFile: './wdio.conf.js'
      }
    }
  });
};
