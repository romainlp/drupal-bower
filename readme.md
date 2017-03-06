## About

> This module only add libraries to the Drupal theme file (*.libraries.yml) after a bower installation

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i drupal-bower --save
```

## How to use

Update your .bowerrc file with those lines:

```
"scripts": {
    "postinstall": "node ./node_modules/drupal-bower/bin/drupal-bower.js install %",
    "preuninstall": "node ./node_modules/drupal-bower/bin/drupal-bower.js uninstall %"
}
```

## Todos

- Manage dependencies
- Refacto (First node module, a little bit messy)