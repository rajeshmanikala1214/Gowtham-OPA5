module.exports = function (config) {
  config.set({

    frameworks: ["ui5"],

    ui5: {
      type: "application",
      paths: {
        webapp: "webapp"
      }
    },

    // ✅ FIX: make Karma reachable from Selenium container
    hostname: process.env.PIPER_SELENIUM_HOSTNAME || "0.0.0.0",

    // keep this as-is (binding is fine)
    listenAddress: "0.0.0.0",

    browsers: ["ChromeWebDriver"],

    customLaunchers: {
      ChromeWebDriver: {
        base: "WebDriver",
        config: {
          // ✅ use Piper env vars properly
          hostname: process.env.PIPER_SELENIUM_WEBDRIVER_HOSTNAME || "selenium",
          port: process.env.PIPER_SELENIUM_WEBDRIVER_PORT
            ? parseInt(process.env.PIPER_SELENIUM_WEBDRIVER_PORT)
            : 4444
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

    // ✅ keep timeouts (good for CI)
    browserDisconnectTimeout: 300000,
    browserNoActivityTimeout: 300000,
    browserDisconnectTolerance: 3,
    captureTimeout: 300000,

    singleRun: true,
    autoWatch: false

  });
};