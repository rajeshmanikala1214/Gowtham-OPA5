/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/App",
	"./pages/Main"
], function (opaTest) {
	"use strict";

	QUnit.module("Navigation Journey");

	opaTest("Should see the initial page of the app", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Assertions
		Then.onTheAppPage.iShouldSeeTheApp();
      	Then.onTheViewPage.iShouldSeeThePageView();

		// Actions
		When.onTheViewPage.iEnterText(5, "idId")
		.and.iEnterText("Restst", "idName")
		.and.iExecuteButton("idCreateButton")
		.and.iExecuteConfirmButton();

		Then.onTheViewPage.iSeeMessageToast();


		// When.onTheViewPage.iExecuteButton("navPage2");


		// When.onTheViewPage.iSelectedRow("idList");



		// Cleanup
		Then.iTeardownMyApp();
	});
});
