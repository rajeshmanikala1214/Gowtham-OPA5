module.exports = function (config) {

  config.set({

    frameworks: ["ui5"],

    ui5: {
      type: "application",
      paths: {
        webapp: "webapp"
      }
    },

    browsers: ["ChromeHeadless"],

    reporters: ["progress", "html"],

    htmlReporter: {
      outputDir: "test-results/opa",
      reportName: "OPA5-Test-Report"
    },

    singleRun: true,
    autoWatch: false

  });

};