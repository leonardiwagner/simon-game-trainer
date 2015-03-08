module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
        javascripts: {
          src: ['bower_components/angular/angular.min.js', 
          'bower_components/jquery/dist/jquery.min.js', 
          'bower_components/underscore/underscore-min.js',
          'js/angularApp.js',
          'js/effects.js',
          ],
          dest: 'dist/main.js'
        },
        stylesheets: {
          src: ['css/bootstrap.css', 'dist/main.css'],
          dest: 'dist/main.css'
        }
    },
    cssmin:{
      target:{
        files:{
          'dist/main.css': 'dist/main.css'
        }
      }
    },
    less:{
      "dist/main.css": ["css/*.less"]
    },
    jshint: {
      src: ['js/*.js']
    },
    /*uglify:{
      files: {
        'dist/uglifieds.js': ['js/effects.js']
      }
    },*/
    watch:{
      script: {
        files: ['js/*.js'],
        tasks: ['jshint:src', 'concat:javascripts']
      },
      stylesheets: {
        files: ['css/*.less'],
        tasks: ['less', 'cssmin', 'concat:stylesheets']
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};