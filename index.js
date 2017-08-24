"use strict";

const figlet = require("figlet");
const loaderUtils = require("loader-utils");

function wrapOutput(output, config) {
  let figletOutput =
    "(function (root, factory) {" +
    "'use strict';" +
    "if (typeof define === 'function' && define.amd) {" +
    "define([], factory);" +
    "} else if (typeof exports === 'object'" +
    "&& typeof module !== 'undefined'" +
    "&& typeof require === 'function'" +
    ") {" +
    "module.exports = factory();" +
    "} else {" +
    "factory();" +
    "}" +
    "})(this, function () {" +
    "'use strict';";

  if (config.outputTextBefore) {
    /* eslint-disable prefer-destructuring */
    const outputTextBefore = config.outputTextBefore;
    const isNeedEscapeBefore = config.outputTextBeforeEscape;
    /* eslint-enable prefer-destructuring */

    figletOutput += `console.log("${isNeedEscapeBefore
      ? encodeURI(outputTextBefore)
      : outputTextBefore}");`;
  }

  output.split("\n").forEach(line => {
    figletOutput += `console.log(decodeURI("${encodeURI(line)}"));`;
  });

  if (config.outputTextAfter) {
    /* eslint-disable prefer-destructuring */
    const outputTextAfter = config.outputTextAfter;
    const isNeedEscapeAfter = config.outputTextAfterEscape;
    /* eslint-enable prefer-destructuring */

    figletOutput += `console.log("${isNeedEscapeAfter
      ? encodeURI(outputTextAfter)
      : outputTextAfter}");`;
  }

  figletOutput += "});";

  return figletOutput;
}

module.exports = function() {
  const callback = this.async();
  const options = loaderUtils.getOptions(this) || {};

  const defaultConfig = {
    fontOptions: {
      font: "ANSI Shadow",
      horizontalLayout: "default",
      kerning: "default",
      verticalLayout: "default"
    },
    text: "FIGLET-LOADER",
    outputTextAfter: null,
    outputTextAfterEscape: false,
    outputTextBefore: null,
    outputTextBeforeEscape: false
  };
  let userConfig = {};

  if (Object.keys(options).length === 0) {
    try {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      userConfig = require(this.resource);
    } catch (error) {
      return callback(error);
    }
  } else {
    userConfig = options;
  }

  const config = Object.assign({}, defaultConfig, userConfig);

  return figlet.text(config.text, config.fontOptions, (error, output) => {
    if (error) {
      return callback(error);
    }

    return callback(null, wrapOutput(output, config));
  });
};
