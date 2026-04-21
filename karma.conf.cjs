module.exports = function (config) {
  config.set({

    frameworks: ["ui5"],

    ui5: {
      type: "application",
      paths: {
        webapp: "webapp"
      }
    },

    browsers: ["ChromeWebDriver"],

    customLaunchers: {
      ChromeWebDriver: {
        base: "WebDriver",
        config: {
          hostname: process.env.PIPER_SELENIUM_WEBDRIVER_HOSTNAME || "selenium",
          port: parseInt(process.env.PIPER_SELENIUM_WEBDRIVER_PORT) || 4444
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

    singleRun: true,
    autoWatch: false,

    // 🔥 IMPORTANT FIXES
    browserNoActivityTimeout: 300000,
    browserDisconnectTimeout: 300000,
    browserDisconnectTolerance: 3,

    // 🔥 Helps UI5 resources load properly
    proxies: {
      "/resources/": "https://ui5.sap.com/resources/",
      "/test-resources/": "https://ui5.sap.com/test-resources/"
    }
  });
};