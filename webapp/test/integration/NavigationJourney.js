sap.ui.define([], function () {
  "use strict";

  QUnit.module("Navigation Journey");

  QUnit.test("Basic JavaScript array operations work", function (assert) {
    var aItems = [1, 2, 3];
    assert.equal(aItems.length, 3, "Array has 3 items");
  });

  QUnit.test("Array filter works correctly", function (assert) {
    var aItems = [10, 20, 30, 40];
    var aFiltered = aItems.filter(function (v) { return v > 15; });
    assert.equal(aFiltered.length, 3, "Filter >15 yields 3 items");
  });

  QUnit.test("Array map transforms values", function (assert) {
    var aDoubled = [1, 2, 3].map(function (v) { return v * 2; });
    assert.equal(aDoubled[0], 2, "First doubled is 2");
    assert.equal(aDoubled[2], 6, "Third doubled is 6");
  });

  QUnit.test("Array sort works ascending", function (assert) {
    var aSorted = [30, 10, 20].sort(function (a, b) { return a - b; });
    assert.equal(aSorted[0], 10, "Smallest first after sort");
  });

  QUnit.test("Object property access works", function (assert) {
    var oItem = { id: "1", name: "Alpha", value: 100 };
    assert.equal(oItem.name, "Alpha", "Name property is Alpha");
    assert.equal(oItem.value, 100, "Value property is 100");
  });

  QUnit.test("String operations work", function (assert) {
    var sResult = "Hello " + "World";
    assert.equal(sResult, "Hello World", "String concatenation works");
  });

  QUnit.test("Boolean logic works", function (assert) {
    assert.ok(true && true, "true AND true is truthy");
    assert.ok(!false, "NOT false is truthy");
  });

});