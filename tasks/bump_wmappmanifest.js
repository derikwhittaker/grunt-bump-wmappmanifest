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
            grunt.fail.fatal('The provided source file was either not found or not provided');
        }        
    }
    
    function cleanDestinationFile(src, dest){        
        if( src !== dest && grunt.file.exists(dest)){
            grunt.log.writeln('Deleting old destination file ' + dest);
            grunt.file.delete(dest);
        }     
    }
    
    function getVersion(options){
        var VERSION_REGEXP = /([\'|\"]?version[\'|\"]?[ ]*:[ ]*[\'|\"]?)([\d||A-a|.|-]*)([\'|\"]?)/i;
        
        if( options.usePackageVersion){
        
            if( !grunt.file.exists(options.packageFile)){
                grunt.fail.fatal('The provided Package.json file was not found.  Please check the path and try again.');
            }
            
            var json = grunt.file.read(options.packageFile);
            var packageObject = JSON.parse(json);
            
            return packageObject.version;
        }
        
        if( options.version === "" ){
            grunt.fail.fatal('You did not specify a version to use');
        }
        
        return options.version;        
    }

    grunt.registerMultiTask('bump_wmappmanifest', 'The best Grunt plugin ever.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            usePackageVersion: true,
            packageFile: './package.json',
            xpath: '//Deployment/App/@Version',
            version: '',
            debug: false
        });
      
        if( options.debug ){
            grunt.log.writeflags(options, 'Options');            
        }
        
        // determine where to get the version info from
        var version = getVersion(options);
        
        this.files.forEach(function(file){
            
            var src = file.src[0];
            var dest = file.dest;

            verifyFileExists(src); 
            cleanDestinationFile(src, dest);
            
            var xml = grunt.file.read(src);
            var doc = new dom().parseFromString(xml);

            var node = xpath.select(options.xpath, doc);            
            if( !node || node.length == 0 ) {
                grunt.fail.fatal('The provided xPath: ' + options.xpath + ' was not correct');
            }
            
            grunt.log.writeln('Current WMAppManifest Version: ' + node[0].value);        
            
            node[0].value = version;
            
            grunt.log.writeln('Updated WMAppManifest Version: ' + node[0].value);            
            grunt.file.write(dest, doc);

        });
  });

};
