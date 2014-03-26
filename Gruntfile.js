/*
 * grunt-bump-wmappmainfest
 * https://github.com/Derik/grunt-plugins
 *
 * Copyright (c) 2014 Derik Whittaker
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  

    // Configuration to be run (and then tested).
    bump_wmappmanifest: {
        wpapp: {
            options: {
                debug: true,
                version: "1.0.1.1",
            },
            src: "./test/files/WMAppManifest.xml",
            dest: "./test/files/WMAppManifest.xml"
        },        
    }
  });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    

    // By default, lint and run all tests.
    grunt.registerTask('default', ['bump_wmappmanifest']);

};
