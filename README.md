# figlet-loader

[![NPM version](https://img.shields.io/npm/v/figlet-loader.svg)](https://www.npmjs.org/package/figlet-loader)
[![Travis Build Status](https://img.shields.io/travis/itgalaxy/figlet-loader/master.svg?label=build)](https://travis-ci.org/itgalaxy/figlet-loader)
[![dependencies Status](https://david-dm.org/itgalaxy/figlet-loader/status.svg)](https://david-dm.org/itgalaxy/figlet-loader)
[![devDependencies Status](https://david-dm.org/itgalaxy/figlet-loader/dev-status.svg)](https://david-dm.org/itgalaxy/figlet-loader?type=dev)
[![peerDependencies Status](https://david-dm.org/itgalaxy/figlet-loader/peer-status.svg)](https://david-dm.org/itgalaxy/figlet-loader?type=peer)
[![Greenkeeper badge](https://badges.greenkeeper.io/itgalaxy/figlet-loader.svg)](https://greenkeeper.io)

Get your figlet build bundled with webpack.

![Example](https://github.com/itgalaxy/figlet-loader/raw/master/example.png?raw=true)

## Installation

```shell
$ npm install figlet-loader --save-dev
```

## Initialization

You have to create a `.figletrc` (or `.figletrc.js`) configuration file and put your figlet stuff in it. Like so

```json
// .figletrc or .figletrc.json
{
  "fontOptions": {
    "font": "ANSI Shadow",
    "horizontalLayout": "default",
    "kerning": "default",
    "verticalLayout": "default"
  },
  "outputTextBefore": "TEXT BEFORE",
  "outputTextBeforeEscape": true,
  "text": "ANOTHER-TEXT",
  "outputTextAfter": "TEXT AFTER",
  "outputTextAfterEscape": true
}
```

Or

```js
'use strict';

module.exports = {
  fontOptions: {
    font: "ANSI Shadow",
    horizontalLayout: "default",
    kerning: "default",
    verticalLayout: "default"
  },
  outputTextBefore: "TEXT BEFORE",
  outputTextBeforeEscape: true,
  text: "ANOTHER-TEXT",
  outputTextAfter: "TEXT AFTER",
  outputTextAfterEscape: true
};
```

Full list of supported **"options"** and their **"description"** can be found in [figlet](https://github.com/patorjk/figlet.js).

### Webpack config

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Put the following code to your webpack config file:

```javascript
module.exports = {
  module: {
    rules: [
      {
        loader: `figlet-loader`,
        options: {
          fontOptions: {
            font: "ANSI Shadow",
            horizontalLayout: "default",
            kerning: "default",
            verticalLayout: "default"
          },
          outputTextBefore: "TEXT BEFORE",
          outputTextBeforeEscape: true,
          text: "ANOTHER-TEXT",
          outputTextAfter: "TEXT AFTER",
          outputTextAfterEscape: true
        },
        test: /figlet$/
      }
    ]
  },
  resolve: {
    alias: {
      figlet$: path.resolve(__dirname, "path/to/empty-file") // You can add comment "Please do not delete this file" in this file
    }
  }
}
```

Config should always contains `text` and `options` as above in **Initialization** section.

### Usage

Now you are able to import your custom figlet build as a module throughout your application like so:

```javascript
const figlet = require('figlet');
```

Or

```javascript
import 'figlet';
```

You can used [bundle](https://github.com/webpack/bundle-loader) plugin for async loading:

```javascript
import figletLoader from 'bundle?lazy!figlet';

figletLoader(() => {});
```

## Related

- [figlet](https://github.com/patorjk/figlet.js) - API for this module

## Contribution

Feel free to push your code if you agree with publishing under the MIT license.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
