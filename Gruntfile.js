module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          'build/static/main.js': [ 'build/GUI/js/main.js' ]
        },
        options: {
          debug: true,
          transform: [ 'browserify-handlebars' ]
        }
      }
    },
    less: {
      dist: {
        files: {
          'build/static/main.css': [ 'build/GUI/css/main.less' ]
        },
        options: {
          sourceMap: false
        }
      }
    },
    watch: {
      files: [ 'build/GUI/**/*' ],
      tasks: [ 'default' ]
    }
  })

  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-less')

  grunt.registerTask('default', [
    'browserify',
    'less'
  ])
}
