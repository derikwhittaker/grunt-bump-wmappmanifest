/*
 * grunt-bump-wmappmainfest
 * https://github.com/Derik/grunt-plugins
 *
 * Copyright (c) 2014 Derik Whittaker
 * Licensed under the MIT license.
 */

'use strict';

var xpath = require('xpath');
var dom = require('xmldom').DOMParser;

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
    
    function verifyFileExists(file){
       if( !grunt.file.exists(file) ){
            grunt.log.fail('The provided source file was either not found or not provided');
        }        
    }
    
    function cleanDestinationFile(src, dest){        
        if( src !== dest && grunt.file.exists(dest)){
            grunt.log.writeln('Deleting old destination file ' + dest);
            grunt.file.delete(dest);
        }     
    }

    grunt.registerMultiTask('bump_wmappmanifest', 'The best Grunt plugin ever.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            version: '.',            
            debug: false
        });
      
        if( options.debug ){
            grunt.log.writeflags(options, 'Options');            
        }
        
//        verifyFileExists(options.src);
//        cleanDestinationFile(options);
        
        //grunt.log.writeln();
//        
        this.files.forEach(function(file){   
            
            var src = file.src[0];
            var dest = file.dest;

            verifyFileExists(src); 
            cleanDestinationFile(src, dest);
            
            var xml = grunt.file.read(src);
            var doc = new dom().parseFromString(xml);
            
            var node = xpath.select("//Deployment/App/@Version", doc);
            
            grunt.log.writeln('Current WMAppManifest Version: ' + node[0].value);        
            
            node[0].value = options.version;
            
            grunt.log.writeln('Updated WMAppManifest Version: ' + node[0].value);
            
            grunt.file.write(dest, doc);


        });
        
//        this.filesSrc.foreach(function(file){
//            grunt.log.writeln(JSON.stringify(file));
//        });
        

    // Iterate over all specified file groups.
//    this.files.forEach(function(f) {
//      // Concat specified files.
//      var src = f.src.filter(function(filepath) {
//        // Warn on and remove invalid source files (if nonull was set).
//        if (!grunt.file.exists(filepath)) {
//          grunt.log.warn('Source file "' + filepath + '" not found.');
//          return false;
//        } else {
//          return true;
//        }
//      }).map(function(filepath) {
//        // Read file source.
//        return grunt.file.read(filepath);
//      }).join(grunt.util.normalizelf(options.separator));
//
//      // Handle options.
//      src += options.punctuation;
//
//      // Write the destination file.
//      grunt.file.write(f.dest, src);
//
//      // Print a success message.
//      grunt.log.writeln('File "' + f.dest + '" created.');
//    });
  });

};
