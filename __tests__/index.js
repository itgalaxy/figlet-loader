import figlet from 'figlet';
import figletConfig from './fixtures/.figletrc.json';
import figletConfig1 from './fixtures/.figletrc1.json';
import figletConfig2 from './fixtures/.figletrc';
import figletConfigInvalid from './fixtures/.figletrc-invalid.json';
import fs from 'fs';
import path from 'path';
import temp from 'temp';
import test from 'ava';
import webpack from 'webpack';

temp.track();

test.cb('should execute successfully with JSON config and use `require("./.figletrc.json")`', (t) => {
    const tempDir = temp.mkdirSync(); // eslint-disable-line no-sync
    const webpackConfig = {
        context: './fixtures',
        entry: './index.js',
        module: {
            loaders: [
                {
                    loader:
                        `${path.resolve(__dirname, '../index.js')}`,
                    test: /\.figletrc\.json$/
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: `${tempDir}`
        }
    };

    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0, 'no compilation error');

        fs.readFile(`${tempDir}/bundle.js`, 'utf8', (fsError, data) => {
            if (fsError) {
                throw fsError;
            }

            figlet.text(figletConfig.text, figletConfig.options, (figletError, output) => {
                if (figletError) {
                    throw figletError;
                }

                output.split('\n').forEach((line) => {
                    t.regex(data, new RegExp(encodeURI(line)));
                });

                t.end();
            });
        });
    });
});

test.cb('should execute successfully with JS config and use `require("./.figletrc.js")`', (t) => {
    const tempDir = temp.mkdirSync(); // eslint-disable-line no-sync
    const webpackConfig = {
        context: './fixtures',
        entry: './index2.js',
        module: {
            loaders: [
                {
                    loader:
                        `${path.resolve(__dirname, '../index.js')}`,
                    test: /\.figletrc\.js$/
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: `${tempDir}`
        }
    };

    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0, 'no compilation error');

        fs.readFile(`${tempDir}/bundle.js`, 'utf8', (fsError, data) => {
            if (fsError) {
                throw fsError;
            }

            figlet.text(figletConfig.text, figletConfig.options, (figletError, output) => {
                if (figletError) {
                    throw figletError;
                }

                output.split('\n').forEach((line) => {
                    t.regex(data, new RegExp(encodeURI(line)));
                });

                t.end();
            });
        });
    });
});

test.cb('should execute successfully with JSON config and use `require("figlet")`', (t) => {
    const tempDir = temp.mkdirSync(); // eslint-disable-line no-sync
    const webpackConfig = {
        context: './fixtures',
        entry: './index1.js',
        module: {
            loaders: [
                {
                    loader:
                        `${path.resolve(__dirname, '../index.js')}`,
                    test: /\.figletrc\.json$/
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: `${tempDir}`
        },
        resolve: {
            alias: {
                figlet$: `${path.resolve(__dirname, 'fixtures/.figletrc.json')}` // eslint-disable-line id-match
            }
        }
    };

    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0, 'no compilation error');

        fs.readFile(`${tempDir}/bundle.js`, 'utf8', (fsError, data) => {
            if (fsError) {
                throw fsError;
            }

            figlet.text(figletConfig.text, figletConfig.options, (figletError, output) => {
                if (figletError) {
                    throw figletError;
                }

                output.split('\n').forEach((line) => {
                    t.regex(data, new RegExp(encodeURI(line)));
                });

                t.end();
            });
        });
    });
});

test.cb('should execute successfully with JS config and use `require("figlet")`', (t) => {
    const tempDir = temp.mkdirSync(); // eslint-disable-line no-sync
    const webpackConfig = {
        context: './fixtures',
        entry: './index1.js',
        module: {
            loaders: [
                {
                    loader:
                        `${path.resolve(__dirname, '../index.js')}`,
                    test: /\.figletrc\.js$/
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: `${tempDir}`
        },
        resolve: {
            alias: {
                figlet$: `${path.resolve(__dirname, 'fixtures/.figletrc.js')}` // eslint-disable-line id-match
            }
        }
    };

    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0, 'no compilation error');

        fs.readFile(`${tempDir}/bundle.js`, 'utf8', (fsError, data) => {
            if (fsError) {
                throw fsError;
            }

            figlet.text(figletConfig2.text, figletConfig2.options, (figletError, output) => {
                if (figletError) {
                    throw figletError;
                }

                output.split('\n').forEach((line) => {
                    t.regex(data, new RegExp(encodeURI(line)));
                });

                t.end();
            });
        });
    });
});

test.cb('should execute successfully using "query string" and use `require("figlet")`', (t) => {
    const tempDir = temp.mkdirSync(); // eslint-disable-line no-sync
    const webpackConfig = {
        context: './fixtures',
        entry: './index1.js',
        module: {
            loaders: [
                {
                    loader:
                        `${path.resolve(__dirname, '../index.js')}?config=${encodeURI(JSON.stringify(figletConfig))}`,
                    test: /figlet\.js$/
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: `${tempDir}`
        },
        resolve: {
            alias: {
                figlet$: `${path.resolve(__dirname, 'fixtures/figlet.js')}` // eslint-disable-line id-match
            }
        }
    };

    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0, 'no compilation error');

        fs.readFile(`${tempDir}/bundle.js`, 'utf8', (fsError, data) => {
            if (fsError) {
                throw fsError;
            }

            figlet.text(figletConfig.text, figletConfig.options, (figletError, output) => {
                if (figletError) {
                    throw figletError;
                }

                output.split('\n').forEach((line) => {
                    t.regex(data, new RegExp(encodeURI(line)));
                });

                t.end();
            });
        });
    });
});

test.cb('should supported "config" using "query string"', (t) => {
    const tempDir = temp.mkdirSync(); // eslint-disable-line no-sync

    const webpackConfig = {
        context: './fixtures',
        entry: './index.js',
        module: {
            loaders: [
                {
                    loader:
                        `${path.resolve(__dirname, '../index.js')}?config=${encodeURI(JSON.stringify(figletConfig))}`,
                    test: /\.figletrc\.json$/
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: `${tempDir}`
        }
    };

    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0, 'no compilation error');

        fs.readFile(`${tempDir}/bundle.js`, 'utf8', (fsError, data) => {
            if (fsError) {
                throw fsError;
            }

            t.regex(data, new RegExp(figletConfig.options.outputTextBefore));
            t.regex(data, new RegExp(figletConfig.options.outputTextAfter));

            figlet.text(figletConfig.text, figletConfig.options, (figletError, output) => {
                if (figletError) {
                    throw figletError;
                }

                output.split('\n').forEach((line) => {
                    t.regex(data, new RegExp(encodeURI(line)));
                });

                t.end();
            });
        });
    });
});

test.cb('should throw error on invalid config', (t) => {
    const tempDir = temp.mkdirSync(); // eslint-disable-line no-sync

    const webpackConfig = {
        context: './fixtures',
        entry: './index.js',
        module: {
            loaders: [
                {
                    loader: `${path.resolve(__dirname, '../index.js')}`
                        + `?config=${encodeURI(JSON.stringify(figletConfigInvalid))}`,
                    test: /\.figletrc\.json$/
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: `${tempDir}`
        }
    };

    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length > 0, 'compilation error');
        t.end();
    });
});

test.cb('should supported "config" using "query string" with escape', (t) => {
    const tempDir = temp.mkdirSync(); // eslint-disable-line no-sync

    const webpackConfig = {
        context: './fixtures',
        entry: './index.js',
        module: {
            loaders: [
                {
                    loader:
                        `${path.resolve(__dirname, '../index.js')}?config=${encodeURI(JSON.stringify(figletConfig1))}`,
                    test: /\.figletrc\.json$/
                }
            ]
        },
        output: {
            filename: 'bundle.js',
            path: `${tempDir}`
        }
    };

    webpack(webpackConfig, (error, stats) => {
        if (error) {
            throw error;
        }

        t.true(stats.compilation.errors.length === 0, 'no compilation error');

        fs.readFile(`${tempDir}/bundle.js`, 'utf8', (fsError, data) => {
            if (fsError) {
                throw fsError;
            }

            t.regex(data, new RegExp(encodeURI(figletConfig1.options.outputTextBefore)));
            t.regex(data, new RegExp(encodeURI(figletConfig1.options.outputTextAfter)));

            figlet.text(figletConfig1.text, figletConfig1.options, (figletError, output) => {
                if (figletError) {
                    throw figletError;
                }

                output.split('\n').forEach((line) => {
                    t.regex(data, new RegExp(encodeURI(line)));
                });

                t.end();
            });
        });
    });
});
