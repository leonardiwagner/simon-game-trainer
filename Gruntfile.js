module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
        javascripts: {
          src: ['bower_components/angular/angular.min.js', 
          'bower_components/jquery/dist/jquery.min.js', 
          'bower_components/underscore/underscore-min.js',
          'dist/uglifieds.js'],
          dest: 'dist/main.js'
        },
        stylesheets: {
          src: ['css/bootstrap.css', 'css/main.css'],
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
    uglify:{
      my_target:{
        files: {
          'dist/uglifieds.js': ['js/*']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify','concat','cssmin']);
};