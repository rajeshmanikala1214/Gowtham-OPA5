sap.ui.define([
  "sap/ui/test/opaQunit",
  "com/sap/btp/zcurdapp/zopa/test/integration/pages/App",
  "com/sap/btp/zcurdapp/zopa/test/integration/pages/Main",
  "com/sap/btp/zcurdapp/zopa/test/integration/pages/Second"
], function (opaTest) {
  "use strict";

  QUnit.module("Navigation Journey");

  opaTest("App should start and show the main view", function (Given, When, Then) {
    Given.iStartMyApp();
    Then.onTheAppPage.iShouldSeeTheApp();
    Then.iTeardownMyApp();
  });

  opaTest("Main view should be visible after launch", function (Given, When, Then) {
    Given.iStartMyApp();
    Then.onTheMainPage.iShouldSeeTheMainView();
    Then.iTeardownMyApp();
  });

  opaTest("Main view should contain a page element", function (Given, When, Then) {
    Given.iStartMyApp();
    Then.onTheMainPage.iShouldSeeThePageElement();
    Then.iTeardownMyApp();
  });

  opaTest("App should render without errors on initial load", function (Given, When, Then) {
    Given.iStartMyApp();
    Then.onTheAppPage.iShouldSeeTheApp();
    Then.iTeardownMyApp();
  });

  opaTest("Main page should load and shell is visible", function (Given, When, Then) {
    Given.iStartMyApp();
    Then.onTheMainPage.iShouldSeeTheMainView();
    Then.iTeardownMyApp();
  });
});