module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        files: {'dist/css/style.css': 'stylesheets/style.scss'}
      }
    },
   jade: {
      dist: {
        files: [ {
          expand: true,
          cwd: 'pages',
          src: ['*.jade'],
          dest: 'dist/',
          rename: function(base, path) {
            return base + path.replace(/\.jade$/, '.html');
          }
        } ]
      }
    },
    uglify: {
      options: {
        beautify: true
      }, 
      dist: {
        files: {
          'dist/js/getreal.min.js': ['scripts/lib/*.js'],
          'dist/js/script.min.js': ['scripts/*.js']
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      files: ['Gruntfile.js', 'pages/**/*', 'scripts/**/*', 'stylesheets/**/*'],
      tasks: ['sass', 'jade', 'uglify'],
    },
    peg: {
      options: { trackLineAndColumn: true },
      example : {
        src: "grammar/relational_algebra.grammar",
        dest: "scripts/parser.js",
        options: {
          exportVar: "QueryParser",
          cache: true
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      all: ["scripts/op*.js", "getreal.js", "tuple.js"]
    },
  });
  
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-peg');
  
  grunt.registerTask('default', ['sass', 'jade', 'uglify']);
};