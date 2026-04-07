/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/Second"
], function (opaTest) {
	"use strict";

	QUnit.module("Second Journey");

	opaTest("Should see the Second page of the app", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Assertions
		When.onTheViewPage.iExecuteButton("navPage2");
		Then.onTheSecondViewPage.iShouldSeeThePageView();

		//Cleanup
		Then.iTeardownMyApp();
	});
});
