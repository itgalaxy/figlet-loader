import figlet from "figlet";
import figletConfigInvalid from "./fixtures/.figletrc-invalid.json";
import figletConfigJSONRc from "./fixtures/.figletrc.json";
import figletConfigRc from "./fixtures/.figletrc";
import fs from "fs";
import path from "path";
import pify from "pify";
import tempy from "tempy";
import test from "ava";
import webpack from "webpack";

const loader = path.resolve(__dirname, "../index.js");
const fixturesDir = path.resolve(__dirname, "fixtures");

test("should execute successfully without any options", t => {
  const buildDir = tempy.directory();
  const DEFAULT_CONFIG = {
    fontOptions: {
      font: "ANSI Shadow",
      horizontalLayout: "default",
      kerning: "default",
      verticalLayout: "default"
    },
    outputTextAfter: null,
    outputTextAfterEscape: false,
    outputTextBefore: null,
    outputTextBeforeEscape: false,
    text: "FIGLET-LOADER"
  };
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
      path: buildDir
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs.readFile)(`${buildDir}/bundle.js`, "utf8").then(data =>
      pify(figlet.text)(
        DEFAULT_CONFIG.text,
        DEFAULT_CONFIG.fontOptions
      ).then(output => {
        output.split("\n").forEach(line => {
          t.true(data.indexOf(encodeURI(line)) !== -1);
        });

        return Promise.resolve();
      })
    );
  });
});

test('should execute successfully with JSON config and use `require("./.figletrc.json")`', t => {
  const buildDir = tempy.directory();
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
      path: buildDir
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs.readFile)(`${buildDir}/bundle.js`, "utf8").then(data =>
      pify(figlet.text)(
        figletConfigJSONRc.text,
        figletConfigJSONRc.fontOptions
      ).then(output => {
        output.split("\n").forEach(line => {
          t.true(data.indexOf(encodeURI(line)) !== -1);
        });

        return Promise.resolve();
      })
    );
  });
});

test('should execute successfully with JS config and use `require("./.figletrc.js")`', t => {
  const buildDir = tempy.directory();
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
      path: buildDir
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs.readFile)(`${buildDir}/bundle.js`, "utf8").then(data =>
      pify(figlet.text)(
        figletConfigRc.text,
        figletConfigRc.fontOptions
      ).then(output => {
        output.split("\n").forEach(line => {
          t.true(data.indexOf(encodeURI(line)) !== -1);
        });

        return Promise.resolve();
      })
    );
  });
});

test('should execute successfully with JSON config and use `require("figlet")`', t => {
  const buildDir = tempy.directory();
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
      path: buildDir
    },
    resolve: {
      alias: {
        // eslint-disable-next-line id-match
        figlet$: `${path.resolve(__dirname, "fixtures/.figletrc.json")}`
      }
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs.readFile)(`${buildDir}/bundle.js`, "utf8").then(data =>
      pify(figlet.text)(
        figletConfigJSONRc.text,
        figletConfigJSONRc.fontOptions
      ).then(output => {
        output.split("\n").forEach(line => {
          t.true(data.indexOf(encodeURI(line)) !== -1);
        });

        return Promise.resolve();
      })
    );
  });
});

test('should execute successfully with JS config and use `require("figlet")`', t => {
  const buildDir = tempy.directory();
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
      path: buildDir
    },
    resolve: {
      alias: {
        // eslint-disable-next-line id-match
        figlet$: `${path.resolve(__dirname, "fixtures/.figletrc.js")}`
      }
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs.readFile)(`${buildDir}/bundle.js`, "utf8").then(data =>
      pify(figlet.text)(
        figletConfigRc.text,
        figletConfigRc.fontOptions
      ).then(output => {
        output.split("\n").forEach(line => {
          t.true(data.indexOf(encodeURI(line)) !== -1);
        });

        return Promise.resolve();
      })
    );
  });
});

test('should execute successfully using `options` and use `require("figlet")`', t => {
  const buildDir = tempy.directory();
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
      path: buildDir
    },
    resolve: {
      alias: {
        figlet$: `${path.resolve(__dirname, "fixtures/figlet.js")}` // eslint-disable-line id-match
      }
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs.readFile)(`${buildDir}/bundle.js`, "utf8").then(data =>
      pify(figlet.text)(
        figletConfigJSONRc.text,
        figletConfigJSONRc.fontOptions
      ).then(output => {
        output.split("\n").forEach(line => {
          t.true(data.indexOf(encodeURI(line)) !== -1);
        });

        return Promise.resolve();
      })
    );
  });
});

test("should throw error on invalid config", t => {
  const buildDir = tempy.directory();
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
      path: buildDir
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
    t.true(stats.compilation.errors.length > 0, "compilation error");

    return Promise.resolve();
  });
});

test('should supported `config` from "query string"', t => {
  const buildDir = tempy.directory();
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
      path: buildDir
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs.readFile)(`${buildDir}/bundle.js`, "utf8").then(data =>
      pify(figlet.text)(
        figletConfigRc.text,
        figletConfigRc.fontOptions
      ).then(output => {
        output.split("\n").forEach(line => {
          t.true(data.indexOf(encodeURI(line)) !== -1);
        });

        return Promise.resolve();
      })
    );
  });
});
