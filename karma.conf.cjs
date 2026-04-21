module.exports = function (config) {
  config.set({

    frameworks: ["ui5"],

    ui5: {
      type: "application",
      paths: {
        webapp: "webapp"
      }
    },

    hostname: "0.0.0.0",
    listenAddress: "0.0.0.0",

    browsers: ["ChromeWebDriver"],

    customLaunchers: {
      ChromeWebDriver: {
        base: "WebDriver",
        config: {
          hostname: process.env.PIPER_SELENIUM_WEBDRIVER_HOSTNAME || "selenium",
          port: 4444
        },
        browserName: "chrome",
        flags: [
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu"
        ],
        pseudoActivityInterval: 30000
      }
    },

    reporters: ["progress", "html"],

    htmlReporter: {
      outputDir: "test-results/opa",
      reportName: "OPA5-Test-Report"
    },

    browserDisconnectTimeout: 300000,
    browserNoActivityTimeout: 300000,
    browserDisconnectTolerance: 3,

    captureTimeout: 300000,

    singleRun: true,
    autoWatch: false

  });
};