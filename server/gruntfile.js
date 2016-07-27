/**
 * Created by amu35 on 21/07/2016.
 */
module.exports = function (grunt) {
  grunt.initConfig({
    concat: {
      angular: {
        files: {'client/app-concat.js': [
          'bower_components/peerjs/peer.js',
          'bower_components/angular/angular.min.js',
          'bower_components/angular-route/angular-route.min.js',
          'bower_components/angular-qrcode/angular-qrcode.js',
          'bower_components/qrcode-generator/js/qrcode.js',
          'bower_components/angular-jwt/dist/angular-jwt.js',
          'client/app/**/*.js',
          '!client/**/*Test.js',
          '../IONIC/www/js/shopModule.js'
        ]}
      },
      css: {
        files: {'public/css/global.css':['client/sass/**/*']}
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
            cwd:'client/',
            src: ['app-concat.js'],
            dest: 'public/js/'
          }]
      }
    },
    watch: {
      scripts: {
        files: [
          'client/app/**/*',
          'client/app/*',
          'client/sass/**/*',
          '../IONIC/www/js/shopModule.js'
        ],
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
  grunt.registerTask('buildClient', ['concat', 'uglify:angular','copy']);

  grunt.registerTask('default', ['buildClient']);
};
