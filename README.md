# grunt-bump-wmappmainfest

> Grunt plugin which can be used to bump or increase the version attribute in a Windows Phone App Manifest file (WMAppManifest).

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bump-wmappmanifest --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bump-wmappmainfest');
```

## The "bump_wmappmanifest" task

### Overview
In your project's Gruntfile, add a section named `bump_wmappmanifest` to the data object passed into `grunt.initConfig()`.

```js
bump_wmappmanifest: {
    wpapp: {
        options: {
            debug: true,
            version: "1.0.1.1",
        },
        src: "./pathToFile/WMAppManifest.xml",
        dest: "./pathToFile/WMAppManifest.xml"
    },        
}
```

### Options

#### options.version
Type: `String`
Default value: `''`

The hard wired version number to use. 

#### options.usePackageVersion
Type: `Boolean`
Default value: `true`

A flag to determine if the version should be taken from the package.json file.  If this value
is true the version option will be ignored.

#### options.packageFile
Type: `String`
Default value: `./package.json`

A path and file name of the package.json file which contains the version to use for the bump.
If this file path and name is not correct an error will be thrown.

#### options.xpath
Type: `String`
Default value: `//Deployment/App/@Version`

A xpath query to find the version file inside the provided xml document.


#### options.debug
Type: `Boolean`
Default value: `false`

A flag to determine if the task should output debug values.

### Usage Examples

#### Default Options
In this example, we use the default option of reading from the package.json file to get the version to use.

```js
grunt.initConfig({
  bump_wmappmanifest: {
    wpapp: {
        options: {},
        src: "./pathToFile/WMAppManifest.xml",
        dest: "./pathToFile/WMAppManifest.xml"
    },  
  },
});
```

#### Custom Options
In this example we are providing the version to use.  This will not be read from the package.json file

```js
bump_wmappmanifest: {
    wpapp: {
        options: {
            version: "1.0.1.1",
        },
        src: "./pathToFile/WMAppManifest.xml",
        dest: "./pathToFile/WMAppManifest.xml"
    },        
}
```


#### Custom Options
In this example we are providing the xpath query to use.  If this value is not correct an error will be reported.

```js
bump_wmappmanifest: {
    wpapp: {
        options: {
            xpath: '//Deployment/App/@Version',
        },
        src: "./pathToFile/WMAppManifest.xml",
        dest: "./pathToFile/WMAppManifest.xml"
    },        
}
```

#### Custom Options
In this example we are updating multiple manifest files.

```js
bump_wmappmanifest: {
    wpapp1: {
        options: {},
        src: "./pathToFile/WMAppManifest.xml",
        dest: "./pathToFile/WMAppManifest.xml"
    },        
    wpapp2: {
        options: {},
        src: "./pathToFile/WMAppManifest.xml",
        dest: "./pathToFile/WMAppManifest.xml"
    },     
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
