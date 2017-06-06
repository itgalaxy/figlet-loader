/* eslint-disable strict, import/no-commonjs */

'use strict';

const figlet = require('figlet');
const loaderUtils = require('loader-utils');

const defaultOptions = {
    options: {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        kerning: 'default',
        outputTextAfter: null,
        outputTextAfterEscape: false,
        outputTextBefore: null,
        outputTextBeforeEscape: false,
        verticalLayout: 'default'
    },
    text: 'FIGLET-LOADER'
};

function wrapOutput(output, config) {
    let figletOutput = '(function (root, factory) {'
        + "'use strict';"
        + "if (typeof define === 'function' && define.amd) {"
        + 'define([], factory);'
        + "} else if (typeof exports === 'object'"
        + "&& typeof module !== 'undefined'"
        + "&& typeof require === 'function'"
        + ') {'
        + 'module.exports = factory();'
        + '} else {'
        + 'factory();'
        + '}'
        + '})(this, function () {'
        + "'use strict';";

    if (config.options.outputTextBefore) {
        const {
            outputTextBefore,
            outputTextBeforeEscape: isNeedEscapeBefore
        } = config.options;

        figletOutput += `console.log("${
            isNeedEscapeBefore
                ? encodeURI(outputTextBefore)
                : outputTextBefore
            }");`;
    }

    output.split('\n').forEach((line) => {
        figletOutput += `console.log(decodeURI("${encodeURI(line)}"));`;
    });

    if (config.options.outputTextAfter) {
        const {
            outputTextAfter,
            outputTextAfterEscape: isNeedEscapeAfter
        } = config.options;

        figletOutput += `console.log("${
            isNeedEscapeAfter
                ? encodeURI(outputTextAfter)
                : outputTextAfter
            }");`;
    }

    figletOutput += '});';

    return figletOutput;
}

function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (error) { // eslint-disable-line no-unused-vars
        return false;
    }

    return true;
}

module.exports = function (resolveConfig) {
    const callback = this.async();
    const options = loaderUtils.getOptions(this);

    let userOptions = null;

    if (options) {
        if (options.useConfigFile) {
            userOptions = resolveConfig && isJSON(resolveConfig)
                ? JSON.parse(resolveConfig)
                : this.exec(resolveConfig, this.resource);
        } else {
            userOptions = options;
        }
    } else {
        userOptions = {};
    }

    const config = Object.assign(
        {},
        defaultOptions,
        userOptions
    );

    figlet.text(config.text, config.options, (error, output) => {
        if (error) {
            return callback(error);
        }

        return callback(null, wrapOutput(output, config));
    });
};
