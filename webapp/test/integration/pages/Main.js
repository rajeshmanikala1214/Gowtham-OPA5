sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/actions/Press"
], function (Opa5, EnterText, Press) {
	"use strict";
	var sViewName = "Main";

	Opa5.createPageObjects({
		onTheViewPage: {

			actions: {
				iEnterText: function (oText, sId) {
					return this.waitFor({
						id: sId,
						viewName: sViewName,
						actions: new EnterText({
							text: oText
						}),
						errorMessage: "Did not find the Input Filed " + sId
					});
				},
				iExecuteButton: function (sId) {
					return this.waitFor({
						id: sId,
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Did not find the Input Filed " + sId
					});

				},
				iExecuteConfirmButton: function () {
					return this.waitFor({
						searchOpenDialogs: false,
						controlType: "sap.m.Button",
						success: function (aButtons) {
							aButtons.forEach(function (oButton) {
								if (oButton.getText() === "OK") {
									oButton.firePress();
									Opa5.assert.ok(true, "Pressed OK button");
								}
							});

							// return aButtons.filter( function(oButton){
							// 	oButton.firePress();
							// 	Opa5.assert.ok(true, "Pressed the okay Button");
							// }
							// );

						},
						errorMessage: "Did not find the okay Button on MessageBox Filed "
					});

				},
				iSelectedRow: function (sId) {

					return this.waitFor({
						id: sId,
						viewName: sViewName,
						success: function (oItems) {
							var aComboBoxItems = oComboBox.getItems();
							if (aComboBoxItems.length !== 0) {
								var oItem = oComboBox.setSelectedIndex(0);
								oComboBox.setSelectedKey("4");
								oComboBox.fireSelectionChange(oItem);
								Opa5.assert.ok(true, "The ComboBox was Selected");

							}
							else{
								Opa5.assert.ok("false", "There are no Items in Combo Box for Selected")
							}
						},
						errorMessage: "Did not find the control " + sId
					});

				}


			},

			assertions: {

				iShouldSeeThePageView: function () {
					return this.waitFor({
						id: "page",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The " + sViewName + " view is displayed");
						},
						errorMessage: "Did not find the " + sViewName + " view"
					});
				},

				iSeeMessageToast: function () {

					return this.waitFor({
						id: "page",
						viewName: sViewName,
						check: function () {
							// Opa5.assert.ok(true, "The OPA5 Tests are Successfull");
							return !!sap.ui.test.Opa5.getJQuery()(".sapMMessageToast").length;
						},
						errorMessage: "Did not find the Message toast in View"
					});



				}
			}
		}
	});

});
