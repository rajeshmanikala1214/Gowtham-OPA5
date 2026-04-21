sap.ui.define([
  "sap/ui/test/opaQunit",
  "com/sap/btp/zcurdapp/zopa/test/integration/pages/App",
  "com/sap/btp/zcurdapp/zopa/test/integration/pages/Main",
  "com/sap/btp/zcurdapp/zopa/test/integration/pages/Second"
], function (opaTest) {
  "use strict";

  QUnit.module("Second View Journey");

  opaTest("App renders second view after navigation", function (Given, When, Then) {
    Given.iStartMyApp();
    Then.onTheAppPage.iShouldSeeTheApp();
    Then.iTeardownMyApp();
  });

  opaTest("Second view page object is accessible", function (Given, When, Then) {
    Given.iStartMyApp();
    Then.onTheSecondPage.iShouldSeeTheSecondView();
    Then.iTeardownMyApp();
  });
});