sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
    function (JSONModel, Device) {
        "use strict";

        return {
            /**
             * Provides runtime information for the device the UI5 app is running on as a JSONModel.
             * @returns {sap.ui.model.json.JSONModel} The device model.
             */
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },

            oCreateCategory: function (oDModel, Data) {

                if (!oDModel) {
                    throw new Error("OData Model is not Passed");
                }

                var oModel = new sap.ui.model.json.JSONModel();
                oDModel.create("/Categories", Data, {
                    // headers:{}
                    success: (createdData)=>{
                        oModel.setData(createdData);
                        sap.m.MessageBox.success("Data Created Successfully");
                       sap.m.MessageToast.show("Data Created Successfully");
                    },
                    error: (error)=>{
                        sap.m.MessageBox.error("Error while creating Data");
                        ErrorHandler.showError(error);
                    }
                })
                return oModel;
            }
        };

    });