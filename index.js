var yaml = require('js-yaml');
var fs = require('fs');

module.exports.install = function(assets) {
    console.log(process.cwd());
    console.log('Install ' + assets)
}

module.exports.uninstall = function(assets) {
    console.log('Uninstall ' + assets)
}