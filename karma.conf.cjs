module.exports = function (config) {
  config.set({

    frameworks: ["ui5"],

    ui5: {
      type: "application",
      paths: {
        webapp: "webapp"
      }
    },

    // 🔥 CRITICAL FIX (from your reference)
    hostname: process.env.PIPER_SELENIUM_HOSTNAME || "karma",
    listenAddress: "0.0.0.0",

    port: 9876,

    browsers: ["ChromeWebDriver"],

    customLaunchers: {
      ChromeWebDriver: {
        base: "WebDriver",
        config: {
          hostname: process.env.PIPER_SELENIUM_WEBDRIVER_HOSTNAME || "selenium",
          port: parseInt(process.env.PIPER_SELENIUM_WEBDRIVER_PORT) || 4444
        },
        browserName: "chrome",

        // 🔥 IMPORTANT for Docker stability
        flags: ["--no-sandbox", "--disable-dev-shm-usage"],

        // 🔥 keeps session alive
        pseudoActivityInterval: 30000
      }
    },

    reporters: ["progress", "html"],

    htmlReporter: {
      outputDir: "test-results/opa",
      reportName: "OPA5-Test-Report"
    },

    // 🔥 VERY IMPORTANT (from your reference)
    captureTimeout: 210000,
    browserDisconnectTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 210000,

    concurrency: 1,

    singleRun: true,
    autoWatch: false,

    logLevel: config.LOG_INFO

  });
};