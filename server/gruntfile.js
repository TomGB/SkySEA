/**
 * Created by amu35 on 21/07/2016.
 */


module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      angular: {
        files: {'client/app-concat.js': [
          'bower_components/angular/angular.min.js',
          'bower_components/angular-route/angular-route.min.js',
          'client/app/**/*.js',
          '!client/**/*Test.js'
        ]}
      }
    },
    uglify : {
      angular: {
        files: {'public/js/app.min.js': 'client/app-concat.js'}
      }
    },
    copy :{
      angular: {
        files: [
          {
            expand: true,
            cwd:'client/',
            src: ['app/**/*.html'],
            dest:'public/'
          },
          {
            expand: true,
            flatten:true,
            cwd:'client/sass',
            src: ['*'],
            dest: 'public/css/'
          }]
      }
    },
    watch: {
      scripts: {
        files: ['client/app/**/*.js'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Next one would load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Here is where we would define our task
  grunt.registerTask('buildClient', ['concat:angular', 'uglify:angular','copy']);

  grunt.registerTask('default', ['buildClient']);
};
