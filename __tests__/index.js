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

test("should execute successfully using config file inside `require`", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index.js",
    module: {
      rules: [
        {
          loader,
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
        t.true(data.indexOf(encodeURI(figletConfigJSONRc.textBefore)) !== -1);
        t.true(data.indexOf(encodeURI(figletConfigJSONRc.textAfter)) !== -1);

        output.split("\n").forEach(line => {
          t.true(data.indexOf(encodeURI(line)) !== -1);
        });

        return Promise.resolve();
      })
    );
  });
});

test("should execute successfully using options and alias with empty file", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index-1.js",
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
        t.true(data.indexOf(encodeURI(figletConfigJSONRc.textBefore)) !== -1);
        t.true(data.indexOf(encodeURI(figletConfigJSONRc.textAfter)) !== -1);

        output.split("\n").forEach(line => {
          t.true(data.indexOf(encodeURI(line)) !== -1);
        });

        return Promise.resolve();
      })
    );
  });
});

test("should execute successfully using options and alias with non-empty file", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index-1.js",
    module: {
      rules: [
        {
          loader,
          options: figletConfigJSONRc,
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
        figlet$: `${path.resolve(__dirname, "fixtures/.figletrc.js")}` // eslint-disable-line id-match
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
        t.true(data.indexOf(encodeURI(figletConfigJSONRc.textBefore)) !== -1);
        t.true(data.indexOf(encodeURI(figletConfigJSONRc.textAfter)) !== -1);

        output.split("\n").forEach(line => {
          t.true(data.indexOf(encodeURI(line)) !== -1);
        });

        return Promise.resolve();
      })
    );
  });
});

test("should execute successfully using alias with empty file", t => {
  const buildDir = tempy.directory();
  const defaultConfig = {
    fontOptions: {
      font: "ANSI Shadow",
      horizontalLayout: "default",
      kerning: "default",
      verticalLayout: "default"
    },
    text: "FIGLET-LOADER",
    outputTextAfter: null,
    outputTextBefore: null
  };
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index-1.js",
    module: {
      rules: [
        {
          loader,
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
      pify(figlet.text)(defaultConfig.text, defaultConfig.fontOptions).then(
        output => {
          output.split("\n").forEach(line => {
            t.true(data.indexOf(encodeURI(line)) !== -1);
          });

          return Promise.resolve();
        }
      )
    );
  });
});

test("should execute successfully using alias as JSON config file", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index-1.js",
    module: {
      rules: [
        {
          loader,
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
        figlet$: `${path.resolve(__dirname, "fixtures/.figletrc.json")}` // eslint-disable-line id-match
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
        t.true(data.indexOf(encodeURI(figletConfigJSONRc.textBefore)) !== -1);
        t.true(data.indexOf(encodeURI(figletConfigJSONRc.textAfter)) !== -1);

        output.split("\n").forEach(line => {
          t.true(data.indexOf(encodeURI(line)) !== -1);
        });

        return Promise.resolve();
      })
    );
  });
});

test("should execute successfully using alias as JavaScript config file", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index-1.js",
    module: {
      rules: [
        {
          loader,
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
        figlet$: `${path.resolve(__dirname, "fixtures/.figletrc.js")}` // eslint-disable-line id-match
      }
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
    t.true(stats.compilation.errors.length === 0, "no compilation error");

    return pify(fs.readFile)(`${buildDir}/bundle.js`, "utf8").then(data =>
      pify(figlet.text)(figletConfigRc.text, figletConfigRc.fontOptions).then(
        output => {
          t.true(data.indexOf(encodeURI(figletConfigRc.textBefore)) !== -1);
          t.true(data.indexOf(encodeURI(figletConfigRc.textAfter)) !== -1);

          output.split("\n").forEach(line => {
            t.true(data.indexOf(encodeURI(line)) !== -1);
          });

          return Promise.resolve();
        }
      )
    );
  });
});

test("should throw error on invalid config", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index.js",
    module: {
      rules: [
        {
          loader,
          options: figletConfigInvalid,
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
    t.true(stats.compilation.errors.length === 1, "compilation error");

    return Promise.resolve();
  });
});

test("should throw error on broken JSON config", t => {
  const buildDir = tempy.directory();
  const webpackConfig = {
    context: fixturesDir,
    entry: "./index-1.js",
    module: {
      rules: [
        {
          loader,
          test: /\.figletrc-broken\.json$/
        }
      ]
    },
    output: {
      filename: "bundle.js",
      path: buildDir
    },
    resolve: {
      alias: {
        figlet$: `${path.resolve(__dirname, "fixtures/.figletrc-broken.json")}` // eslint-disable-line id-match
      }
    }
  };

  return pify(webpack)(webpackConfig).then(stats => {
    t.true(stats.compilation.warnings.length === 0, "no compilation warnings");
    t.true(stats.compilation.errors.length === 1, "compilation error");

    return Promise.resolve();
  });
});
