sap.ui.define([
  "sap/ui/test/Opa5"
], function (Opa5) {
  "use strict";

  Opa5.createPageObjects({
    onTheSecondPage: {
      actions: {},
      assertions: {
        iShouldSeeTheSecondView: function () {
          return this.waitFor({
            viewName: "Second",
            success: function () {
              Opa5.assert.ok(true, "The Second view is accessible");
            },
            errorMessage: "Could not find the Second view"
          });
        }
      }
    }
  });
});