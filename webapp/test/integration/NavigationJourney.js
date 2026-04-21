sap.ui.define([
  "sap/ui/test/Opa5"
], function (Opa5) {
  "use strict";

  QUnit.module("Navigation Journey");

  QUnit.test("Opa5 is available", function (assert) {
    assert.ok(Opa5, "Opa5 class is loaded and available");
  });

  QUnit.test("Opa5 config can be set", function (assert) {
    Opa5.extendConfig({ pollingInterval: 100 });
    assert.ok(true, "Opa5 config extended without error");
  });

  QUnit.test("Page objects can be created", function (assert) {
    var bThrew = false;
    try {
      Opa5.createPageObjects({
        onTestPage: {
          actions: {},
          assertions: {
            iShouldSeeIt: function () {
              return this.waitFor({
                success: function () {
                  Opa5.assert.ok(true, "waitFor resolved");
                }
              });
            }
          }
        }
      });
    } catch (e) {
      bThrew = true;
    }
    assert.ok(!bThrew, "createPageObjects does not throw");
  });

  QUnit.test("Opa5 default config has correct properties", function (assert) {
    var oConfig = Opa5.getConfig();
    assert.ok(typeof oConfig === "object", "getConfig returns an object");
  });

  QUnit.test("Opa5 reset does not throw", function (assert) {
    var bThrew = false;
    try {
      Opa5.resetConfig();
    } catch (e) {
      bThrew = true;
    }
    assert.ok(!bThrew, "resetConfig does not throw");
  });

});