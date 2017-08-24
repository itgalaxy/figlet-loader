"use strict";

const figlet = require("figlet");
const loaderUtils = require("loader-utils");

function wrapOutput(output, config) {
  let figletOutput = "";

  if (config.textBefore) {
    figletOutput += encodeURI(`${config.textBefore}\n`);
  }

  output.split("\n").forEach(line => {
    figletOutput += encodeURI(`${line}\n`);
  });

  if (config.textAfter) {
    figletOutput += encodeURI(`${config.textAfter}\n`);
  }

  return `module.exports = decodeURI("${figletOutput}");`;
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
    textAfter: null,
    textBefore: null
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
