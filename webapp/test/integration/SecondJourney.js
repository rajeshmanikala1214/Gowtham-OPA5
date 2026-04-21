sap.ui.define([
  "sap/ui/test/Opa5",
  "sap/ui/test/matchers/Properties",
  "sap/ui/test/matchers/AggregationFilled"
], function (Opa5, Properties, AggregationFilled) {
  "use strict";

  QUnit.module("Second View Journey");

  QUnit.test("Properties matcher is available", function (assert) {
    assert.ok(Properties, "Properties matcher class is loaded");
  });

  QUnit.test("AggregationFilled matcher is available", function (assert) {
    assert.ok(AggregationFilled,
      "AggregationFilled matcher class is loaded");
  });

  QUnit.test("Properties matcher can be instantiated", function (assert) {
    var oMatcher = new Properties({ text: "Hello" });
    assert.ok(oMatcher, "Properties matcher instantiated");
    assert.equal(
      oMatcher.getProperties().text, "Hello",
      "Properties matcher stores property value"
    );
  });

  QUnit.test("AggregationFilled matcher can be instantiated",
    function (assert) {
      var oMatcher = new AggregationFilled({ name: "items" });
      assert.ok(oMatcher, "AggregationFilled matcher instantiated");
    }
  );

  QUnit.test("Opa5 page objects can declare second page",
    function (assert) {
      var bThrew = false;
      try {
        Opa5.createPageObjects({
          onTheSecondPage: {
            actions: {},
            assertions: {}
          }
        });
      } catch (e) {
        bThrew = true;
      }
      assert.ok(!bThrew,
        "Second page object created without error");
    }
  );

});