# figlet-loader

[![NPM version](https://img.shields.io/npm/v/figlet-loader.svg)](https://www.npmjs.org/package/figlet-loader) [![Travis Build Status](https://img.shields.io/travis/itgalaxy/figlet-loader/master.svg?label=build)](https://travis-ci.org/itgalaxy/figlet-loader) [![dependencies Status](https://david-dm.org/itgalaxy/figlet-loader/status.svg)](https://david-dm.org/itgalaxy/figlet-loader) [![devDependencies Status](https://david-dm.org/itgalaxy/figlet-loader/dev-status.svg)](https://david-dm.org/itgalaxy/figlet-loader?type=dev)

Get your figlet build bundled with webpack.

![Example](https://github.com/itgalaxy/figlet-loader/raw/master/example.png?raw=true)

## Installation

```shell
$ npm install figlet-loader --save-dev
```

## Initialization

You have to create a `.figletrc` configuration file and put your figlet stuff in it. Like so

```json
// .figletrc or .figletrc.json
{
    "options": {
        "outputTextBefore": "TEXT BEFORE",
        "outputTextBeforeEscape": true,
        "outputTextAfter": "TEXT AFTER",
        "outputTextAfterEscape": true,
        "font": "ANSI Shadow",
        "horizontalLayout": "default",
        "kerning": "default",
        "verticalLayout": "default"
    },
    "text": "ANOTHER-TEXT"
}
```

Full list of supported **"options"** and their **"description"** can be found in [figlet](https://github.com/patorjk/figlet.js).

### Webpack config

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Put the following code to your webpack config file:

```javascript
module.exports = {
  module: {
    loaders: [
      {
        loader: "figlet",
        test: /\.figletrc$/, // or "/\.figletrc\.json$/"
      }
    ]
  },
  resolve: {
    alias: {
      figlet$: path.resolve(__dirname, "path/to/.figletrc") // or "path/to/.figletrc.json"
    }
  }
}
```

Using configuration through `resolve.alias` supported only `JSON` **(PR welcome)**.

Alternative configurations supported dynamic configuration:

```javascript
module.exports = {
  module: {
    loaders: [
      {
       loader: `figlet?config=${encodeURI(JSON.stringify(figletConfig))}`,
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

Note: `webpack` normalize `query` to `loader`, if you want to specify `url` in `outputTextBefore` or `outputTextAfter`, then use `'Visit Site - https:\\/\\/itgalaxy.company'`.

Using `config` through `query string` is have large priority than through `resolve.alias`.

Option `figletConfig` must contain `text` and `options` as above in **Initialization** section.

### Usage

Now you are able to import your custom figlet build as a module throughout your application like so:

```javscript
import 'figlet';
```

You can used [bundle](https://github.com/webpack/bundle-loader) plugin for async loading:

```javscript
import figletLoader from 'bundle?lazy!figlet';

figletLoader(() => {});
```

## Related

- [figlet](https://github.com/patorjk/figlet.js) - API for this module

## Contribution

Don't hesitate to create a pull request. Every contribution is appreciated.

## [Changelog](CHANGELOG.md)

## [License](LICENSE.md)
