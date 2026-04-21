sap.ui.define([], function () {
  "use strict";

  QUnit.module("Second View Journey");

  QUnit.test("Object creation works", function (assert) {
    var oItem = { id: "1", name: "Beta", value: 200 };
    assert.ok(oItem, "Object created");
    assert.equal(oItem.id, "1", "ID is correct");
  });

  QUnit.test("Number arithmetic works", function (assert) {
    assert.equal(100 + 200, 300, "100 + 200 = 300");
    assert.equal(500 - 200, 300, "500 - 200 = 300");
    assert.equal(10 * 30, 300, "10 * 30 = 300");
  });

  QUnit.test("Array push and pop work", function (assert) {
    var aItems = ["Alpha", "Beta"];
    aItems.push("Gamma");
    assert.equal(aItems.length, 3, "Length is 3 after push");
    var sPopped = aItems.pop();
    assert.equal(sPopped, "Gamma", "Popped item is Gamma");
    assert.equal(aItems.length, 2, "Length is 2 after pop");
  });

  QUnit.test("String indexOf works", function (assert) {
    var sText = "Hello World";
    assert.ok(sText.indexOf("World") > -1, "World found in string");
    assert.equal(sText.indexOf("xyz"), -1, "xyz not found in string");
  });

  QUnit.test("typeof operator works", function (assert) {
    assert.equal(typeof "hello", "string", "String type correct");
    assert.equal(typeof 42, "number", "Number type correct");
    assert.equal(typeof true, "boolean", "Boolean type correct");
    assert.equal(typeof {}, "object", "Object type correct");
  });

  QUnit.test("JSON parse and stringify work", function (assert) {
    var oData = { key: "value", num: 42 };
    var sJson = JSON.stringify(oData);
    var oParsed = JSON.parse(sJson);
    assert.equal(oParsed.key, "value", "Parsed key matches");
    assert.equal(oParsed.num, 42, "Parsed num matches");
  });

  QUnit.test("Array reduce works", function (assert) {
    var aNumbers = [1, 2, 3, 4, 5];
    var nSum = aNumbers.reduce(function (acc, v) { return acc + v; }, 0);
    assert.equal(nSum, 15, "Sum of 1-5 is 15");
  });

});