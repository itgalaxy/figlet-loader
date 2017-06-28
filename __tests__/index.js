import figlet from "figlet";
import figletConfigInvalid from "./fixtures/.figletrc-invalid.json";
import figletConfigJSONRc from "./fixtures/.figletrc.json";
import figletConfigRc from "./fixtures/.figletrc";
import fs from "fs";
import path from "path";
import pify from "pify";
import test from "ava";
import tmp from "tmp";
import webpack from "webpack";

const loader = path.resolve(__dirname, "../index.js");
const fixturesDir = path.resolve(__dirname, "fixtures");

tmp.setGracefulCleanup();

test("should execute successfully without any options", t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const DEFAULT_CONFIG = {
            options: {
                font: "ANSI Shadow",
                horizontalLayout: "default",
                kerning: "default",
                outputTextAfter: null,
                outputTextAfterEscape: false,
                outputTextBefore: null,
                outputTextBeforeEscape: false,
                verticalLayout: "default"
            },
            text: "FIGLET-LOADER"
        };
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: "./index1.js",
            module: {
                rules: [
                    {
                        loader: `${loader}`,
                        test: /figlet\.js$/
                    }
                ]
            },
            output: {
                filename: "bundle.js",
                path: `${tmpPath}`
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                "no compilation error"
            );

            return pify(fs.readFile)(
                `${tmpPath}/bundle.js`,
                "utf8"
            ).then(data =>
                pify(figlet.text)(
                    DEFAULT_CONFIG.text,
                    DEFAULT_CONFIG.options
                ).then(output => {
                    output.split("\n").forEach(line => {
                        t.true(data.indexOf(encodeURI(line)) !== -1);
                    });

                    return cleanupCallback();
                })
            );
        });
    }));

test('should execute successfully with JSON config and use `require("./.figletrc.json")`', t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: "./index.js",
            module: {
                rules: [
                    {
                        loader: `${loader}?useConfigFile`,
                        test: /\.figletrc\.json$/
                    }
                ]
            },
            output: {
                filename: "bundle.js",
                path: `${tmpPath}`
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                "no compilation error"
            );

            return pify(fs.readFile)(
                `${tmpPath}/bundle.js`,
                "utf8"
            ).then(data =>
                pify(figlet.text)(
                    figletConfigJSONRc.text,
                    figletConfigJSONRc.options
                ).then(output => {
                    output.split("\n").forEach(line => {
                        t.true(data.indexOf(encodeURI(line)) !== -1);
                    });

                    return cleanupCallback();
                })
            );
        });
    }));

test('should execute successfully with JS config and use `require("./.figletrc.js")`', t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: "./index2.js",
            module: {
                rules: [
                    {
                        loader: `${loader}?useConfigFile`,
                        test: /\.figletrc\.js$/
                    }
                ]
            },
            output: {
                filename: "bundle.js",
                path: `${tmpPath}`
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                "no compilation error"
            );

            return pify(fs.readFile)(
                `${tmpPath}/bundle.js`,
                "utf8"
            ).then(data =>
                pify(figlet.text)(
                    figletConfigRc.text,
                    figletConfigRc.options
                ).then(output => {
                    output.split("\n").forEach(line => {
                        t.true(data.indexOf(encodeURI(line)) !== -1);
                    });

                    return cleanupCallback();
                })
            );
        });
    }));

test('should execute successfully with JSON config and use `require("figlet")`', t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: "./index1.js",
            module: {
                rules: [
                    {
                        loader: `${loader}?useConfigFile`,
                        test: /\.figletrc\.json$/
                    }
                ]
            },
            output: {
                filename: "bundle.js",
                path: `${tmpPath}`
            },
            resolve: {
                alias: {
                    // eslint-disable-next-line id-match
                    figlet$: `${path.resolve(
                        __dirname,
                        "fixtures/.figletrc.json"
                    )}`
                }
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                "no compilation error"
            );

            return pify(fs.readFile)(
                `${tmpPath}/bundle.js`,
                "utf8"
            ).then(data =>
                pify(figlet.text)(
                    figletConfigJSONRc.text,
                    figletConfigJSONRc.options
                ).then(output => {
                    output.split("\n").forEach(line => {
                        t.true(data.indexOf(encodeURI(line)) !== -1);
                    });

                    return cleanupCallback();
                })
            );
        });
    }));

test('should execute successfully with JS config and use `require("figlet")`', t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: "./index1.js",
            module: {
                loaders: [
                    {
                        loader: `${loader}?useConfigFile`,
                        test: /\.figletrc\.js$/
                    }
                ]
            },
            output: {
                filename: "bundle.js",
                path: `${tmpPath}`
            },
            resolve: {
                alias: {
                    // eslint-disable-next-line id-match
                    figlet$: `${path.resolve(
                        __dirname,
                        "fixtures/.figletrc.js"
                    )}`
                }
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                "no compilation error"
            );

            return pify(fs.readFile)(
                `${tmpPath}/bundle.js`,
                "utf8"
            ).then(data =>
                pify(figlet.text)(
                    figletConfigRc.text,
                    figletConfigRc.options
                ).then(output => {
                    output.split("\n").forEach(line => {
                        t.true(data.indexOf(encodeURI(line)) !== -1);
                    });

                    return cleanupCallback();
                })
            );
        });
    }));

test('should execute successfully using `options` and use `require("figlet")`', t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: "./index1.js",
            module: {
                rules: [
                    {
                        loader,
                        options: figletConfigJSONRc,
                        test: /figlet\.js$/
                    }
                ]
            },
            output: {
                filename: "bundle.js",
                path: `${tmpPath}`
            },
            resolve: {
                alias: {
                    figlet$: `${path.resolve(__dirname, "fixtures/figlet.js")}` // eslint-disable-line id-match
                }
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                "no compilation error"
            );

            return pify(fs.readFile)(
                `${tmpPath}/bundle.js`,
                "utf8"
            ).then(data =>
                pify(figlet.text)(
                    figletConfigJSONRc.text,
                    figletConfigJSONRc.options
                ).then(output => {
                    output.split("\n").forEach(line => {
                        t.true(data.indexOf(encodeURI(line)) !== -1);
                    });

                    return cleanupCallback();
                })
            );
        });
    }));

test("should throw error on invalid config", t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: "./index1.js",
            module: {
                rules: [
                    {
                        loader,
                        options: figletConfigInvalid,
                        test: /figlet\.js$/
                    }
                ]
            },
            output: {
                filename: "bundle.js",
                path: `${tmpPath}`
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(stats.compilation.errors.length > 0, "compilation error");

            return cleanupCallback();
        });
    }));

test('should supported `config` from "query string"', t =>
    pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    }).then(result => {
        const [tmpPath, cleanupCallback] = result;
        const webpackConfig = {
            context: fixturesDir,
            entry: "./index.js",
            module: {
                loaders: [
                    {
                        loader: `${loader}?${JSON.stringify(figletConfigRc)}`,
                        test: /\.figletrc\.json$/
                    }
                ]
            },
            output: {
                filename: "bundle.js",
                path: `${tmpPath}`
            }
        };

        return pify(webpack)(webpackConfig).then(stats => {
            t.true(
                stats.compilation.errors.length === 0,
                "no compilation error"
            );

            return pify(fs.readFile)(
                `${tmpPath}/bundle.js`,
                "utf8"
            ).then(data =>
                pify(figlet.text)(
                    figletConfigRc.text,
                    figletConfigRc.options
                ).then(output => {
                    output.split("\n").forEach(line => {
                        t.true(data.indexOf(encodeURI(line)) !== -1);
                    });

                    return cleanupCallback();
                })
            );
        });
    }));
