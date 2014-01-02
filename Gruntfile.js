/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html-smoosher');
  grunt.loadNpmTasks('grunt-useminPrepare');
  grunt.loadNpmTasks('grunt-usemin');
  
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= pkg.license %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/js/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },cssmin: {
	  minify: {
		expand: true,
		cwd: 'src/css/',
		src: ['*.css', '!*.min.css'],
		dest: 'dist/',
		ext: '.min.css'
	  }
	},
    gruntfile: {
        src: 'Gruntfile.js'
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    },
	smoosher: {
	  all: {
		files: {
		  'dist/index.inline.html': 'dist/index.html',
		},
	  },
	},
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist',
	    root: "src"
      },
    },
	usemin: {
      html: 'dist/index.html',
    },
	copy: {
      main: {
        src: 'src/index.html',
        dest: 'dist/index.html',
      },
    },
  });
  // Default task.
  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('release', ['copy:main', 'useminPrepare', 'usemin', 'smoosher']);

};
