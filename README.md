# figlet-loader

[![NPM version](https://img.shields.io/npm/v/figlet-loader.svg)](https://www.npmjs.org/package/figlet-loader)
[![Travis Build Status](https://img.shields.io/travis/itgalaxy/figlet-loader/master.svg?label=build)](https://travis-ci.org/itgalaxy/figlet-loader)
[![dependencies Status](https://david-dm.org/itgalaxy/figlet-loader/status.svg)](https://david-dm.org/itgalaxy/figlet-loader)
[![devDependencies Status](https://david-dm.org/itgalaxy/figlet-loader/dev-status.svg)](https://david-dm.org/itgalaxy/figlet-loader?type=dev)
[![peerDependencies Status](https://david-dm.org/itgalaxy/figlet-loader/peer-status.svg)](https://david-dm.org/itgalaxy/figlet-loader?type=peer)
[![Greenkeeper badge](https://badges.greenkeeper.io/itgalaxy/figlet-loader.svg)](https://greenkeeper.io)

Get your figlet build bundled with webpack.

![Example](https://github.com/itgalaxy/figlet-loader/raw/master/example.png?raw=true)

## Install

```shell
$ npm install figlet-loader --save-dev
```

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

There are three use case.

1. Using loader `options`.

```javascript
import content from 'figlet'; // or `const content = require('figlet');`

console.log(content);
```

**webpack.config.js**

```javascript
module.exports = {
  module: {
    rules: [
      {
        loader: "figlet-loader",
        options: {
          fontOptions: {
            // Full list of supported options and their description can be found in [figlet](https://github.com/patorjk/figlet.js).
            font: "ANSI Shadow",
            horizontalLayout: "default",
            kerning: "default",
            verticalLayout: "default"
          },
          textBefore: "TEXT BEFORE",
          text: "ANOTHER-TEXT",
          textAfter: "TEXT AFTER"
        },
        test: /empty-alias-file\.js$/
      }
    ]
  },
  resolve: {
    alias: {
      // You can add comment "Please do not delete this file" in this file
      figlet$: path.resolve(__dirname, "/path/to/empty-alias-file.js")
    }
  }
}
```

2. Using config file through alias (supported **JavaScript** and **JSON** syntax).

```javascript
import context from 'figlet'; // or `const content = require('figlet');`

console.log(content);
```

**.figletrc.js**

```javascript
"use strict";

module.exports = {
  fontOptions: {
    font: "ANSI Shadow",
    horizontalLayout: "default",
    kerning: "default",
    verticalLayout: "default"
  },
  textBefore: "TEXT BEFORE",
  text: "ANOTHER-TEXT-JS-RC",
  textAfter: "TEXT AFTER"
};
```

**webpack.config.js**

```javascript
module.exports = {
  module: {
    rules: [
      {
        loader: "figlet-loader",
        test: /\.figletrc\.js$/
      }
    ]
  },
  resolve: {
    alias: {
      figlet$: path.resolve(__dirname, "/path/to/.figletrc.js")
    }
  }
}
```

3. Using config (supported **JavaScript** and **JSON** syntax) file directly (see below example how it is use).

```javascript
import content from '.figletrc.js';

console.log(content);
```

**webpack.config.js**

```javascript
module.exports = {
  module: {
    rules: [
      {
        loader: "figlet-loader",
        test: /\.figletrc\.js$/
      }
    ]
  }
}
```

## Additional Usage

Async loading:

1. Using `webpack` dynamic `import`.

```javascript
import('figlet').then((content) => console.log(content));
```

2. You can used [bundle](https://github.com/webpack/bundle-loader) plugin for async loading:

```javascript
import figletLoader from 'bundle?lazy!figlet';

figletLoader((content) => console.log(content));
```

## Related

- [figlet](https://github.com/patorjk/figlet.js) - API for this module

## Contribution

Feel free to push your code if you agree with publishing under the MIT license.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
