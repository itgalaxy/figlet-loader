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
    figletOutput += `console.log(decodeURI("${encodeURI(
      config.outputTextBefore
    )}"));`;
  }

  output.split("\n").forEach(line => {
    figletOutput += `console.log(decodeURI("${encodeURI(line)}"));`;
  });

  if (config.outputTextAfter) {
    figletOutput += `console.log(decodeURI("${encodeURI(
      config.outputTextAfter
    )}"));`;
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
