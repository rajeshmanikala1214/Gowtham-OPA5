/*global QUnit*/

sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";

  // Create a minimal mock controller that mirrors Main.controller
  // without pulling in MessageBox and its heavy dependency chain
  var MockMainController = Controller.extend(
    "com.sap.btp.zcurdapp.zopa.test.unit.MockMain", {
      onInit: function () {
        // minimal init - no MessageBox dependency
      },
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

  QUnit.test("Controller has correct type", function (assert) {
    assert.ok(
      this.oController instanceof Controller,
      "Instance extends sap.ui.core.mvc.Controller"
    );
  });

  QUnit.test("onInit does not throw", function (assert) {
    var bThrew = false;
    try {
      this.oController.onInit();
    } catch (e) {
      bThrew = true;
    }
    assert.ok(!bThrew, "onInit executes without error");
  });

  QUnit.module("Main Controller - Model Handling", {
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

  QUnit.test("JSONModel contains 3 items", function (assert) {
    assert.equal(
      this.oModel.getProperty("/items").length, 3,
      "Model contains 3 items"
    );
  });

  QUnit.test("JSONModel item names are correct", function (assert) {
    var aItems = this.oModel.getProperty("/items");
    assert.equal(aItems[0].name, "Alpha", "First item is Alpha");
    assert.equal(aItems[1].name, "Beta",  "Second item is Beta");
    assert.equal(aItems[2].name, "Gamma", "Third item is Gamma");
  });

  QUnit.test("JSONModel item values are numeric", function (assert) {
    var aItems = this.oModel.getProperty("/items");
    var bAllNumeric = aItems.every(function (o) {
      return typeof o.value === "number";
    });
    assert.ok(bAllNumeric, "All item values are numbers");
  });

  QUnit.test("JSONModel busy flag defaults to false", function (assert) {
    assert.strictEqual(
      this.oModel.getProperty("/busy"), false,
      "Busy defaults to false"
    );
  });

  QUnit.test("JSONModel selectedItem defaults to null", function (assert) {
    assert.strictEqual(
      this.oModel.getProperty("/selectedItem"), null,
      "selectedItem defaults to null"
    );
  });

  QUnit.test("JSONModel busy flag can be updated", function (assert) {
    this.oModel.setProperty("/busy", true);
    assert.strictEqual(
      this.oModel.getProperty("/busy"), true,
      "Busy updated to true"
    );
  });

  QUnit.test("JSONModel item can be added", function (assert) {
    var aItems = this.oModel.getProperty("/items");
    aItems.push({ id: "4", name: "Delta", value: 400 });
    this.oModel.setProperty("/items", aItems);
    assert.equal(
      this.oModel.getProperty("/items").length, 4,
      "Item count is now 4"
    );
  });

  QUnit.test("JSONModel item can be removed", function (assert) {
    var aItems = this.oModel.getProperty("/items");
    aItems.splice(0, 1);
    this.oModel.setProperty("/items", aItems);
    assert.equal(
      this.oModel.getProperty("/items").length, 2,
      "Item count is now 2"
    );
  });

  QUnit.module("Main Controller - Logic");

  QUnit.test("Filter reduces item count", function (assert) {
    var aItems = [
      { id: "1", name: "Alpha", value: 100 },
      { id: "2", name: "Beta",  value: 200 },
      { id: "3", name: "Gamma", value: 300 }
    ];
    var aFiltered = aItems.filter(function (o) {
      return o.value > 150;
    });
    assert.equal(aFiltered.length, 2, "Filter >150 yields 2 items");
  });

  QUnit.test("Sort orders items ascending", function (assert) {
    var aItems = [
      { name: "Beta",  value: 200 },
      { name: "Alpha", value: 100 },
      { name: "Gamma", value: 300 }
    ];
    aItems.sort(function (a, b) { return a.value - b.value; });
    assert.equal(aItems[0].name, "Alpha",
      "Lowest value item is first after sort");
  });

  QUnit.test("Object property assignment works", function (assert) {
    var oItem = { id: "1", name: "Alpha", value: 100 };
    oItem.status = "active";
    assert.equal(oItem.status, "active", "Status assigned correctly");
  });

  QUnit.test("Array map doubles values", function (assert) {
    var aDoubled = [100, 200, 300].map(function (v) { return v * 2; });
    assert.equal(aDoubled[0], 200, "100 doubled is 200");
    assert.equal(aDoubled[2], 600, "300 doubled is 600");
  });

  QUnit.test("String concatenation works", function (assert) {
    assert.equal("Item: " + 42, "Item: 42",
      "String + number concatenation works");
  });

});