## About

> This module only add libraries to the Drupal theme file (*.libraries.yml) after a bower installation

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm install drupal-bower --save
```

Install it globally

```sh
$ npm install -g drupal-bower
```

## How to use

Update your .bowerrc file with those lines:

* If you installed it inside your project:

```
"scripts": {
    "postinstall": "node ./node_modules/drupal-bower/bin/drupal-bower.js install %",
    "preuninstall": "node ./node_modules/drupal-bower/bin/drupal-bower.js uninstall %"
}
```

* If you installed it globally

```
"scripts": {
    "postinstall": "DrupalBower install %",
    "preuninstall": "DrupalBower uninstall %"
}
```

## Todos

- Manage dependencies
- Refacto (First node module, a little bit messy)