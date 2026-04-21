/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require([
  "com/sap/btp/zcurdapp/zopa/test/integration/NavigationJourney",
  "com/sap/btp/zcurdapp/zopa/test/integration/SecondJourney"
], function () {
  "use strict";
  QUnit.start();
});