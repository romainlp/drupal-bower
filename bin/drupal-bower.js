#!/usr/bin/env node

var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));
var DrupalBower = require('../');

var invoke = function(env) {
  if (argv._.length == 0) {
    console.log('Use install of uninstall commads');
    process.exit(0);
  }

  if (argv._[0] === 'install') {
    DrupalBower.install(argv._.slice(1));
  }

  if (argv._[0] === 'uninstall') {
    DrupalBower.uninstall(argv._.slice(1));
  }
}

const Cli = new Liftoff({
  name: 'DrupalBower',
  v8flags: ['--harmony']
});

Cli.launch({}, invoke);