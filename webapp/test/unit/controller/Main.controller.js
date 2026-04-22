/*global QUnit*/

sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";

  var MockMainController = Controller.extend(
    "com.sap.btp.zcurdapp.zopa.test.unit.MockMain", {
      onInit: function () {},
      onPress: function () {}
    }
  );

  QUnit.module("Main Controller - Instantiation", {
    beforeEach: function () {
      this.oController = new MockMainController();
    },
    afterEach: function () {
      this.oController.destroy();
    }
  });

  QUnit.test("Controller can be instantiated", function (assert) {
    assert.ok(this.oController, "Controller instance exists");
  });

  QUnit.test("Controller extends sap.ui.core.mvc.Controller", function (assert) {
    assert.ok(
      this.oController instanceof Controller,
      "Instance is a Controller"
    );
  });

  QUnit.test("onInit does not throw", function (assert) {
    var bThrew = false;
    try { this.oController.onInit(); }
    catch (e) { bThrew = true; }
    assert.ok(!bThrew, "onInit runs without error");
  });

  QUnit.module("Main Controller - Model", {
    beforeEach: function () {
      this.oModel = new JSONModel({
        items: [
          { id: "1", name: "Alpha", value: 100 },
          { id: "2", name: "Beta",  value: 200 },
          { id: "3", name: "Gamma", value: 300 }
        ],
        selectedItem: null,
        busy: false
      });
    },
    afterEach: function () {
      this.oModel.destroy();
    }
  });

  QUnit.test("Model has 3 items", function (assert) {
    assert.equal(
      this.oModel.getProperty("/items").length, 3,
      "3 items in model"
    );
  });

  QUnit.test("Item names are correct", function (assert) {
    var aItems = this.oModel.getProperty("/items");
    assert.equal(aItems[0].name, "Alpha", "First is Alpha");
    assert.equal(aItems[1].name, "Beta",  "Second is Beta");
    assert.equal(aItems[2].name, "Gamma", "Third is Gamma");
  });

  QUnit.test("Item values are numeric", function (assert) {
    var bOk = this.oModel.getProperty("/items").every(function (o) {
      return typeof o.value === "number";
    });
    assert.ok(bOk, "All values are numbers");
  });

  QUnit.test("Busy defaults to false", function (assert) {
    assert.strictEqual(this.oModel.getProperty("/busy"), false,
      "Busy is false");
  });

  QUnit.test("selectedItem defaults to null", function (assert) {
    assert.strictEqual(this.oModel.getProperty("/selectedItem"), null,
      "selectedItem is null");
  });

  QUnit.test("Busy can be set to true", function (assert) {
    this.oModel.setProperty("/busy", true);
    assert.strictEqual(this.oModel.getProperty("/busy"), true,
      "Busy updated to true");
  });

  QUnit.test("Item can be added", function (assert) {
    var aItems = this.oModel.getProperty("/items");
    aItems.push({ id: "4", name: "Delta", value: 400 });
    this.oModel.setProperty("/items", aItems);
    assert.equal(this.oModel.getProperty("/items").length, 4,
      "Count is 4 after add");
  });

  QUnit.test("Item can be removed", function (assert) {
    var aItems = this.oModel.getProperty("/items");
    aItems.splice(0, 1);
    this.oModel.setProperty("/items", aItems);
    assert.equal(this.oModel.getProperty("/items").length, 2,
      "Count is 2 after remove");
  });

  QUnit.module("Main Controller - Logic");

  QUnit.test("Filter works", function (assert) {
    var aFiltered = [100, 200, 300].filter(function (v) {
      return v > 150;
    });
    assert.equal(aFiltered.length, 2, "Filter >150 gives 2 items");
  });

  QUnit.test("Sort ascending works", function (assert) {
    var aSorted = [30, 10, 20].sort(function (a, b) { return a - b; });
    assert.equal(aSorted[0], 10, "Smallest is first");
  });

  QUnit.test("String concatenation works", function (assert) {
    assert.equal("Item: " + 42, "Item: 42",
      "Concatenation produces correct string");
  });

  QUnit.test("Map doubles values", function (assert) {
    var aDoubled = [100, 200, 300].map(function (v) { return v * 2; });
    assert.equal(aDoubled[1], 400, "200 doubled is 400");
  });

  QUnit.test("Object assignment works", function (assert) {
    var o = { name: "Alpha" };
    o.status = "active";
    assert.equal(o.status, "active", "Status assigned correctly");
  });

  QUnit.module("Main Controller - Known Issues (Expected Failures)");

  QUnit.test("XFAIL: string comparison is case-sensitive", function (assert) {
    // This test intentionally fails to demonstrate failure reporting
    assert.equal("hello", "Hello", "Case-sensitive comparison fails as expected");
  });

  QUnit.test("XFAIL: strict equality with type coercion", function (assert) {
    assert.strictEqual(1, "1", "Strict equality between number and string fails");
  });

  QUnit.test("XFAIL: empty array is not falsy", function (assert) {
    assert.notOk([], "Empty array is truthy in JS - this assertion fails");
  });

  QUnit.test("XFAIL: object identity comparison", function (assert) {
    var o1 = { id: 1 };
    var o2 = { id: 1 };
    assert.strictEqual(o1, o2, "Two separate objects are not identical");
  });

  QUnit.test("XFAIL: floating point precision", function (assert) {
    assert.strictEqual(0.1 + 0.2, 0.3, "Floating point 0.1+0.2 does not equal 0.3 exactly");
  });
  
});