module.exports = function (config) {
  config.set({

    frameworks: ["ui5"],

    ui5: {
      type: "application",
      paths: {
        webapp: "webapp"
      }
    },

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
        name: "Karma",
        flags: [
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu"
        ],
        pseudoActivityInterval: 30000
      }
    },

    reporters: ["progress", "html", "junit"],

    htmlReporter: {
      outputDir: "test-results/opa",
      reportName: "OPA5-Test-Report"
    },

    junitReporter: {
      outputDir: "reports",
      outputFile: "TESTS-karma.xml",
      useBrowserName: false,
      suite: "KarmaTests"
    },

    captureTimeout: 210000,
    browserDisconnectTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 210000,

    singleRun: true,
    autoWatch: false,
    colors: true,
    logLevel: config.LOG_INFO,

    forceJSONP: true,
    concurrency: 1,

    plugins: [
      "karma-ui5",
      "karma-qunit",
      "karma-chrome-launcher",
      "karma-html-reporter",
      "karma-junit-reporter",
      "karma-webdriver-launcher"
    ]
  });
};