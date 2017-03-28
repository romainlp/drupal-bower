'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {
  constructor() {
    super();
    this.eventsReady = [];
  }
}
const myEmitter = new MyEmitter();

var BowerDrupal = function() {
  this.vendorDir = null,
  this.debug = true,
  this.librariesFile = null,
  this.libraries = [],
  this.action = null
}

BowerDrupal.prototype.exec = function (action, env, libraries) {
  this.setVendorDir(env.configFiles['.bower'].cwd);
  this.loadLibraries();
  this.action = action;
  this.argv = libraries;

  if (this.action === 'install') {
    this.buildAssetList(libraries);
  } else if (this.action === 'uninstall') {
    this.uninstallLibraries(libraries);
  }
}

BowerDrupal.prototype.setVendorDir = function (bowerFilePath) {
  var doc = yaml.safeLoad(fs.readFileSync(bowerFilePath), 'utf-8');
  if (doc.hasOwnProperty('directory')) {
    this.vendorDir = doc.directory;
  } else {
    this.vendorDir = 'bower_components/';
  }
}

BowerDrupal.prototype.loadLibraries = function () {
  var fileLibrariePattern = '*.libraries.yml';
  var instance = this;
  glob(fileLibrariePattern, {}, function (er, files) {
    if (files.length === 0) {
      console.log('Unable to find the libraries.yml file');
      process.exit(0);
    } else {
      instance.librariesFile = files[0];
      myEmitter.emit('assets_ready', instance, 'libraries');
    }
  })
}

BowerDrupal.prototype.uninstallLibraries = function (libraries) {
  myEmitter.on('assets_ready', function(instance) {
    if (instance.action === 'uninstall') {
      libraries.forEach( function(element, index) {
        var index = element.replace('.', '-');
        var currentLibraries = yaml.safeLoad(fs.readFileSync('./' + instance.librariesFile));
        delete currentLibraries[index];
        var yamlDump = yaml.safeDump(currentLibraries);

        fs.writeFile('./' + instance.librariesFile, yamlDump, function(error) {
          if (error) {
            console.error("write error:  " + error.message);
          } else {
            console.log("Successful Write to " + instance.librariesFile);
          }
        });
      });
    }
  })
}

BowerDrupal.prototype.buildAssetList = function(assets) {
  var instance = this;
  assets.forEach( function(element, index) {

    var library = {};
    var libraryPath = instance.vendorDir + element + '/';
    var settings = JSON.parse(fs.readFileSync(libraryPath + 'bower.json'));
    library.name = element.replace('.', '-');
    if (settings.version === undefined) {
        settings = JSON.parse(fs.readFileSync(libraryPath + '.bower.json'));
    }
    library.version = settings.version;

    if (settings.main !== undefined) {
      if (Array.isArray(settings.main)) {
        settings.main.forEach( function(element, index) {
          var extension = path.extname(element).substring(1);
          if (extension == 'js') {
            if (library.js === undefined) {
              library.js = {};
            }
            library.js[libraryPath + element] = {};
          } else if (extension == 'css') {
            if (library.css === undefined) {
              library.css = { theme: {}};
            }
            library.css.theme[libraryPath + element] = {};
          }
        });
      } else {
        var extension = path.extname(settings.main).substring(1);
        if (extension == 'js') {
          library.js = {};
          library.js[libraryPath + settings.main] = {};
        } else if (extension == 'css') {
          library.css = { theme: {}};
          library.css.theme[libraryPath + settings.main] = {};

        }
      }
    }
    instance.libraries.push(library);

  });
  myEmitter.emit('assets_ready', this, 'assets');
}

BowerDrupal.prototype.updateFile = function() {
  var instance = this;
  var libraries = yaml.safeLoad(fs.readFileSync('./' + this.librariesFile));

  this.libraries.forEach(function(element, index) {
    var index = element.name;
    delete element.name;
    libraries[index] = element;
  })

  var yamlDump = yaml.safeDump(libraries);

  fs.writeFile('./' + this.librariesFile, yamlDump, function(error) {
    if (error) {
      console.error("write error:  " + error.message);
    } else {
      console.log("Successful Write to " + instance.librariesFile);
    }
  });
}

myEmitter.on('assets_ready', function(instance, event_name) {
  this.eventsReady.push(event_name);
  if (this.eventsReady.indexOf('assets') !== -1 && this.eventsReady.indexOf('libraries') !== -1) {
    instance.updateFile();
  }
})

module.exports = new BowerDrupal();
