/**
 * Created by amu35 on 21/07/2016.
 */


module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      angular: {
        files: {'client/app-concat.js': ['client/app/**/*.js', '!client/**/*Test.js'] }
      }
    },
    uglify : {
      angular: {
        files: {'public/js/app.min.js': 'client/app-concat.js'}
      }
    },
    copy :{
      angular: {
        files: {'public/templates/': 'client/app/**/*.html'}
      }
    }
  });

  // Next one would load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');


  // Here is where we would define our task
  grunt.registerTask('buildClient', ['concat:angular', 'uglify:angular','copy:angular']);

  grunt.registerTask('default', ['buildClient']);
};
