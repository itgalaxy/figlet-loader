import figlet from 'figlet';
import figletConfig from './fixtures/.figletrc.json';
import figletConfig1 from './fixtures/.figletrc1.json';
import figletConfig2 from './fixtures/.figletrc';
import figletConfigInvalid from './fixtures/.figletrc-invalid.json';
import fs from 'fs';
import path from 'path';
import pify from 'pify';
import test from 'ava';
import tmp from 'tmp';
import webpack from 'webpack';

const loader = path.resolve(__dirname, '../index.js');
const fixturesDir = path.resolve(__dirname, 'fixtures');

tmp.setGracefulCleanup();

test(
    'should execute successfully with JSON config and use `require("./.figletrc.json")`',
    (t) => pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    })
        .then((result) => {
            const [tmpPath, cleanupCallback] = result;
            const webpackConfig = {
                context: fixturesDir,
                entry: './index.js',
                module: {
                    loaders: [
                        {
                            loader,
                            test: /\.figletrc\.json$/
                        }
                    ]
                },
                output: {
                    filename: 'bundle.js',
                    path: `${tmpPath}`
                }
            };

            return pify(webpack)(webpackConfig)
                .then((stats) => {
                    t.true(stats.compilation.errors.length === 0, 'no compilation error');

                    return pify(fs.readFile)(`${tmpPath}/bundle.js`, 'utf8')
                        .then(
                            (data) => figlet.text(
                                figletConfig.text,
                                figletConfig.options,
                                (figletError, output) => {
                                    if (figletError) {
                                        throw figletError;
                                    }

                                    output.split('\n').forEach(
                                        (line) => {
                                            t.regex(data, new RegExp(encodeURI(line)));
                                        }
                                    );

                                    return cleanupCallback();
                                }
                            )
                        );
                });
        })
);

test(
    'should execute successfully with JS config and use `require("./.figletrc.js")`',
    (t) => pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    })
        .then((result) => {
            const [tmpPath, cleanupCallback] = result;
            const webpackConfig = {
                context: fixturesDir,
                entry: './index2.js',
                module: {
                    loaders: [
                        {
                            loader,
                            test: /\.figletrc\.js$/
                        }
                    ]
                },
                output: {
                    filename: 'bundle.js',
                    path: `${tmpPath}`
                }
            };

            return pify(webpack)(webpackConfig)
                .then((stats) => {
                    t.true(stats.compilation.errors.length === 0, 'no compilation error');

                    return pify(fs.readFile)(`${tmpPath}/bundle.js`, 'utf8')
                        .then(
                            (data) => figlet.text(
                                figletConfig.text,
                                figletConfig.options,
                                (figletError, output) => {
                                    if (figletError) {
                                        throw figletError;
                                    }

                                    output.split('\n').forEach((line) => {
                                        t.regex(data, new RegExp(encodeURI(line)));
                                    });

                                    return cleanupCallback();
                                }
                            )
                        );
                });
        })
);

test(
    'should execute successfully with JSON config and use `require("figlet")`',
    (t) => pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    })
        .then((result) => {
            const [tmpPath, cleanupCallback] = result;
            const webpackConfig = {
                context: fixturesDir,
                entry: './index1.js',
                module: {
                    loaders: [
                        {
                            loader,
                            test: /\.figletrc\.json$/
                        }
                    ]
                },
                output: {
                    filename: 'bundle.js',
                    path: `${tmpPath}`
                },
                resolve: {
                    alias: {
                        figlet$: `${path.resolve(__dirname, 'fixtures/.figletrc.json')}` // eslint-disable-line id-match
                    }
                }
            };

            return pify(webpack)(webpackConfig)
                .then((stats) => {
                    t.true(stats.compilation.errors.length === 0, 'no compilation error');

                    return pify(fs.readFile)(`${tmpPath}/bundle.js`, 'utf8')
                        .then(
                            (data) => figlet.text(
                                figletConfig.text,
                                figletConfig.options,
                                (figletError, output) => {
                                    if (figletError) {
                                        throw figletError;
                                    }

                                    output.split('\n').forEach((line) => {
                                        t.regex(data, new RegExp(encodeURI(line)));
                                    });

                                    return cleanupCallback();
                                }
                            )
                        );
                });
        })
);

test(
    'should execute successfully with JS config and use `require("figlet")`',
    (t) => pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    })
        .then((result) => {
            const [tmpPath, cleanupCallback] = result;
            const webpackConfig = {
                context: fixturesDir,
                entry: './index1.js',
                module: {
                    loaders: [
                        {
                            loader,
                            test: /\.figletrc\.js$/
                        }
                    ]
                },
                output: {
                    filename: 'bundle.js',
                    path: `${tmpPath}`
                },
                resolve: {
                    alias: {
                        figlet$: `${path.resolve(__dirname, 'fixtures/.figletrc.js')}` // eslint-disable-line id-match
                    }
                }
            };

            return pify(webpack)(webpackConfig)
                .then((stats) => {
                    t.true(stats.compilation.errors.length === 0, 'no compilation error');

                    return pify(fs.readFile)(`${tmpPath}/bundle.js`, 'utf8')
                        .then(
                            (data) => figlet.text(
                                figletConfig2.text,
                                figletConfig2.options,
                                (figletError, output) => {
                                    if (figletError) {
                                        throw figletError;
                                    }

                                    output.split('\n').forEach((line) => {
                                        t.regex(data, new RegExp(encodeURI(line)));
                                    });

                                    return cleanupCallback();
                                }
                            )
                        );
                });
        })
);

test(
    'should execute successfully using "query string" and use `require("figlet")`',
    (t) => pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    })
        .then((result) => {
            const [tmpPath, cleanupCallback] = result;
            const webpackConfig = {
                context: fixturesDir,
                entry: './index1.js',
                module: {
                    loaders: [
                        {
                            loader: `${loader}?config=${encodeURI(JSON.stringify(figletConfig))}`,
                            test: /figlet\.js$/
                        }
                    ]
                },
                output: {
                    filename: 'bundle.js',
                    path: `${tmpPath}`
                },
                resolve: {
                    alias: {
                        figlet$: `${path.resolve(__dirname, 'fixtures/figlet.js')}` // eslint-disable-line id-match
                    }
                }
            };

            return pify(webpack)(webpackConfig)
                .then((stats) => {
                    t.true(stats.compilation.errors.length === 0, 'no compilation error');

                    return pify(fs.readFile)(`${tmpPath}/bundle.js`, 'utf8')
                        .then(
                            (data) => figlet.text(
                                figletConfig.text,
                                figletConfig.options,
                                (figletError, output) => {
                                    if (figletError) {
                                        throw figletError;
                                    }

                                    output.split('\n').forEach((line) => {
                                        t.regex(data, new RegExp(encodeURI(line)));
                                    });

                                    return cleanupCallback();
                                })
                        );
                });
        })
);

test(
    'should supported "config" using "query string"',
    (t) => pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    })
        .then((result) => {
            const [tmpPath, cleanupCallback] = result;

            const webpackConfig = {
                context: fixturesDir,
                entry: './index.js',
                module: {
                    loaders: [
                        {
                            loader: `${loader}?config=${encodeURI(JSON.stringify(figletConfig))}`,
                            test: /\.figletrc\.json$/
                        }
                    ]
                },
                output: {
                    filename: 'bundle.js',
                    path: `${tmpPath}`
                }
            };

            return pify(webpack)(webpackConfig)
                .then((stats) => {
                    t.true(stats.compilation.errors.length === 0, 'no compilation error');

                    return pify(fs.readFile)(`${tmpPath}/bundle.js`, 'utf8')
                        .then((data) => {
                            t.regex(data, new RegExp(figletConfig.options.outputTextBefore));
                            t.regex(data, new RegExp(figletConfig.options.outputTextAfter));

                            return figlet.text(
                                figletConfig.text,
                                figletConfig.options,
                                (figletError, output) => {
                                    if (figletError) {
                                        throw figletError;
                                    }

                                    output.split('\n').forEach((line) => {
                                        t.regex(data, new RegExp(encodeURI(line)));
                                    });

                                    return cleanupCallback();
                                }
                            );
                        });
                });
        })
);

test(
    'should throw error on invalid config',
    (t) => pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    })
        .then((result) => {
            const [tmpPath, cleanupCallback] = result;
            const webpackConfig = {
                context: fixturesDir,
                entry: './index.js',
                module: {
                    loaders: [
                        {
                            loader: `${loader}?config=${encodeURI(JSON.stringify(figletConfigInvalid))}`,
                            test: /\.figletrc\.json$/
                        }
                    ]
                },
                output: {
                    filename: 'bundle.js',
                    path: `${tmpPath}`
                }
            };

            return pify(webpack)(webpackConfig)
                .then((stats) => {
                    t.true(stats.compilation.errors.length > 0, 'compilation error');

                    return cleanupCallback();
                });
        })
);

test(
    'should supported "config" using "query string" with escape',
    (t) => pify(tmp.dir, {
        multiArgs: true
    })({
        unsafeCleanup: true
    })
        .then((result) => {
            const [tmpPath, cleanupCallback] = result;
            const webpackConfig = {
                context: fixturesDir,
                entry: './index.js',
                module: {
                    loaders: [
                        {
                            loader: `${loader}?config=${encodeURI(JSON.stringify(figletConfig1))}`,
                            test: /\.figletrc\.json$/
                        }
                    ]
                },
                output: {
                    filename: 'bundle.js',
                    path: `${tmpPath}`
                }
            };

            return pify(webpack)(webpackConfig)
                .then((stats) => {
                    t.true(stats.compilation.errors.length === 0, 'no compilation error');

                    return pify(fs.readFile)(`${tmpPath}/bundle.js`, 'utf8')
                        .then((data) => {
                            t.regex(data, new RegExp(encodeURI(figletConfig1.options.outputTextBefore)));
                            t.regex(data, new RegExp(encodeURI(figletConfig1.options.outputTextAfter)));

                            return figlet.text(
                                figletConfig1.text,
                                figletConfig1.options,
                                (figletError, output) => {
                                    if (figletError) {
                                        throw figletError;
                                    }

                                    output.split('\n').forEach((line) => {
                                        t.regex(data, new RegExp(encodeURI(line)));
                                    });

                                    return cleanupCallback();
                                });
                        });
                });
        })
);
