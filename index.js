'use strict';

const yaml = require('js-yaml');
const fs = require('fs');

var BowerDrupal = function() {
  this.vendorDir = null,
  this.debug = true
}
/**
 * Entry function
 */
BowerDrupal.prototype.exec = function (action, env, assets) {
  this.setVendorDir(env.configFiles['.bower'].cwd)
  this.loadLibraries()
}
/**
 * Get the vendor directory form .bowerrc file
 */
BowerDrupal.prototype.setVendorDir = function (bowerFilePath) {
  var doc = yaml.safeLoad(fs.readFileSync(bowerFilePath), 'utf-8')
  if (doc.hasOwnProperty('directory')) {
    this.vendorDir = doc.directory
  } else {
    this.vendorDir = 'bower_components/'
  }
  if (this.debug) {
    console.log('Set vendorDir: ' + this.vendorDir)
  }
}
/**
 * Load current libraries from drupal.libraries.yml file
 */
BowerDrupal.prototype.loadLibraries = function () {
  var filePattern = '*.libraries.yml'
  var libraries = yaml.safeLoad(fs.readFileSyc)
}

module.exports = new BowerDrupal();