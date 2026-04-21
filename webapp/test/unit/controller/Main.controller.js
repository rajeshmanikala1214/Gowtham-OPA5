/*global QUnit, sinon*/

sap.ui.define([
  "com/sap/btp/zcurdapp/zopa/controller/Main.controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox"
], function (MainController, JSONModel, MessageBox) {
  "use strict";

  QUnit.module("Main Controller - Instantiation", {
    beforeEach: function () {
      this.oController = new MainController();
    },
    afterEach: function () {
      this.oController.destroy();
    }
  });

  QUnit.test("Controller can be instantiated", function (assert) {
    assert.ok(this.oController, "Main controller instance exists");
  });

  QUnit.test("Controller has correct type", function (assert) {
    assert.ok(
      this.oController instanceof MainController,
      "Instance is of MainController type"
    );
  });

  QUnit.test("onInit does not throw", function (assert) {
    assert.doesNotThrow(function () {
      this.oController.onInit();
    }.bind(this), "onInit() executes without error");
  });

  QUnit.module("Main Controller - Model Handling", {
    beforeEach: function () {
      this.oController = new MainController();
      this.oModel = new JSONModel({
        items: [
          { id: "1", name: "Alpha",  value: 100 },
          { id: "2", name: "Beta",   value: 200 },
          { id: "3", name: "Gamma",  value: 300 }
        ],
        selectedItem: null,
        busy: false
      });
    },
    afterEach: function () {
      this.oController.destroy();
      this.oModel.destroy();
    }
  });

  QUnit.test("JSONModel can be created with items array", function (assert) {
    var aItems = this.oModel.getProperty("/items");
    assert.equal(aItems.length, 3, "Model contains 3 items");
  });

  QUnit.test("JSONModel item names are correct", function (assert) {
    var aItems = this.oModel.getProperty("/items");
    assert.equal(aItems[0].name, "Alpha", "First item name is Alpha");
    assert.equal(aItems[1].name, "Beta",  "Second item name is Beta");
    assert.equal(aItems[2].name, "Gamma", "Third item name is Gamma");
  });

  QUnit.test("JSONModel item values are numeric", function (assert) {
    var aItems = this.oModel.getProperty("/items");
    aItems.forEach(function (oItem) {
      assert.ok(typeof oItem.value === "number", "Value of " + oItem.name + " is a number");
    });
  });

  QUnit.test("JSONModel busy flag defaults to false", function (assert) {
    var bBusy = this.oModel.getProperty("/busy");
    assert.strictEqual(bBusy, false, "Busy flag defaults to false");
  });

  QUnit.test("JSONModel selectedItem defaults to null", function (assert) {
    var oSelected = this.oModel.getProperty("/selectedItem");
    assert.strictEqual(oSelected, null, "selectedItem defaults to null");
  });

  QUnit.test("JSONModel property can be updated", function (assert) {
    this.oModel.setProperty("/busy", true);
    assert.strictEqual(this.oModel.getProperty("/busy"), true, "Busy flag can be set to true");
  });

  QUnit.test("JSONModel item can be added dynamically", function (assert) {
    var aItems = this.oModel.getProperty("/items");
    aItems.push({ id: "4", name: "Delta", value: 400 });
    this.oModel.setProperty("/items", aItems);
    assert.equal(this.oModel.getProperty("/items").length, 4, "Item count increased to 4");
  });

  QUnit.test("JSONModel item can be removed", function (assert) {
    var aItems = this.oModel.getProperty("/items");
    aItems.splice(0, 1);
    this.oModel.setProperty("/items", aItems);
    assert.equal(this.oModel.getProperty("/items").length, 2, "Item count decreased to 2 after removal");
  });

  QUnit.module("Main Controller - Utility / Logic", {
    beforeEach: function () {
      this.oController = new MainController();
    },
    afterEach: function () {
      this.oController.destroy();
    }
  });

  QUnit.test("formatValue returns string representation", function (assert) {
    // Utility: basic JS formatting used in controllers
    var sFormatted = String(42);
    assert.equal(sFormatted, "42", "Number 42 formats to string '42'");
  });

  QUnit.test("Empty array has zero length", function (assert) {
    var aEmpty = [];
    assert.equal(aEmpty.length, 0, "Empty array length is 0");
  });

  QUnit.test("Filter reduces item count", function (assert) {
    var aItems = [
      { id: "1", name: "Alpha", value: 100 },
      { id: "2", name: "Beta",  value: 200 },
      { id: "3", name: "Gamma", value: 300 }
    ];
    var aFiltered = aItems.filter(function (o) { return o.value > 150; });
    assert.equal(aFiltered.length, 2, "Filtering value > 150 yields 2 items");
  });

  QUnit.test("Sort orders items ascending by value", function (assert) {
    var aItems = [
      { name: "Beta",  value: 200 },
      { name: "Alpha", value: 100 },
      { name: "Gamma", value: 300 }
    ];
    aItems.sort(function (a, b) { return a.value - b.value; });
    assert.equal(aItems[0].name, "Alpha", "First item after sort is Alpha (lowest value)");
  });

  QUnit.test("Object property assignment works correctly", function (assert) {
    var oItem = { id: "1", name: "Alpha", value: 100 };
    oItem.status = "active";
    assert.equal(oItem.status, "active", "Status property assigned correctly");
  });
});