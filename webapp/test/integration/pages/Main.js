sap.ui.define([
  "sap/ui/test/Opa5",
  "sap/ui/test/matchers/Properties"
], function (Opa5, Properties) {
  "use strict";

  Opa5.createPageObjects({
    onTheMainPage: {
      actions: {},
      assertions: {
        iShouldSeeTheMainView: function () {
          return this.waitFor({
            id: "Main",
            viewName: "Main",
            success: function () {
              Opa5.assert.ok(true, "The Main view is visible");
            },
            errorMessage: "Could not find the Main view"
          });
        },
        iShouldSeeThePageElement: function () {
          return this.waitFor({
            controlType: "sap.m.Page",
            success: function (aPages) {
              Opa5.assert.ok(aPages.length > 0, "At least one sap.m.Page is rendered on Main view");
            },
            errorMessage: "No sap.m.Page found on the Main view"
          });
        }
      }
    }
  });
});