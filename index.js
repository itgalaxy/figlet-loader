/* eslint-disable strict, import/no-commonjs */

'use strict';

const figlet = require('figlet');
const querystring = require('querystring');

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
        const outputTextBefore = config.options.outputTextBefore;
        const isNeedEscapeBefore = config.options.outputTextBeforeEscape;

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
        const outputTextAfter = config.options.outputTextAfter;
        const isNeedEscapeAfter = config.options.outputTextAfterEscape;

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
    if (typeof this.cacheable === 'function') {
        this.cacheable();
    }

    const callback = this.async();

    let externalConfig = null;

    if (this.query.length > 0) {
        let parsedQuery = {};

        if (this.query.length > 0) {
            parsedQuery = querystring.parse(this.query.slice(1, this.query.length));
        }

        if (parsedQuery.config) {
            externalConfig = JSON.parse(parsedQuery.config);
        }
    } else {
        externalConfig = resolveConfig && isJSON(resolveConfig)
            ? JSON.parse(resolveConfig)
            : this.exec(resolveConfig, this.resource);
    }

    const config = Object.assign(
        {},
        {
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
        },
        externalConfig
    );

    figlet.text(config.text, config.options, (error, output) => {
        if (error) {
            return callback(error);
        }

        return callback(null, wrapOutput(output, config));
    });
};
