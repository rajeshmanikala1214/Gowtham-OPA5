sap.ui.define([
  "sap/ui/test/Opa5"
], function (Opa5) {
  "use strict";

  Opa5.createPageObjects({
    onTheAppPage: {
      actions: {},
      assertions: {
        iShouldSeeTheApp: function () {
          return this.waitFor({
            id: "App",
            viewName: "App",
            success: function () {
              Opa5.assert.ok(true, "The App view is visible");
            },
            errorMessage: "Could not find the App view"
          });
        }
      }
    }
  });
});