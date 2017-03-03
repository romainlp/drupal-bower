#!/usr/bin/env node

var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));
var DrupalBower = require('../');

var invoke = function(env) {
  // Check if there is a .bowerrc file
  // @todo Check all bowerrc file available
  // @see https://bower.io/docs/config/
  if (env.configFiles['.bower'].cwd === null) {
    console.log('Unable to locate .bowerrc file.')
    process.exit(0);
  }
  // Check the commands argv
  if (argv._.length == 0) {
    console.log('Use install of uninstall commads');
    process.exit(0);
  }

  if (argv._[0] === 'install' || argv._[0] === 'uninstall') {
    DrupalBower.exec(argv._[0], env, argv._.slice(1));
  }
}

const Cli = new Liftoff({
  name: 'DrupalBower',
  configFiles: {
    '.bower': {
      cwd: '.'
    }
  },
  extensions: {
    'rc': null
  },
  v8flags: ['--harmony']
});

Cli.launch({
}, invoke);