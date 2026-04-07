sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "com/sap/btp/zcurdapp/zopa/model/models"
], (Controller, MessageBox, models) => {
    "use strict";

    return Controller.extend("com.sap.btp.zcurdapp.zopa.controller.Main", {
        onInit() {
        },
        onCreateCategory: function () {
            var sId = this.getView().byId("idId").getValue();
            var sDesc = this.getView().byId("idName").getValue();

            var obj = {
                ID: parseInt(sId),
                Name: sDesc
            };

            var oModel = this.getView().getModel();
            oModel.setUseBatch(false);
            const returnModel = models.oCreateCategory(oModel, obj);

            returnModel.attachRequestCompleted(function (oEvent) {
                oEvent.getSource().detachRequestCompleted(function () { }, this)
                this.getView().setModel(oModel);
                sap.m.MessageToast.show("Created Successfully")
            }, this)



            // oModel.create("/Categories", obj, {
            //     success: oData => {
            //         debugger
            //     },
            //     error: oError => {
            //         debugger
            //     }
            // }
            // )
        },

        onUpdateCategory: function (oEvent) {
            const oList = this.getView().byId("idList");
            const oSelectedItem = oList.getSelectedItem();
            const oObj = oSelectedItem.getBindingContext().getObject();
            var sDesc = this.getView().byId("idName").getValue();
            var obj = {
                ID: parseInt(oObj.ID),
                Name: sDesc
            };
            var oModel = this.getView().getModel();
            oModel.setUseBatch(false);
            oModel.update(`/Categories(${obj.ID})`, obj, {
                success: oData => {
                    debugger
                    MessageBox.success("Updated Successflly");
                },
                error: oError => {
                    debugger
                    MessageBox.error("Updated Successflly");
                }
            });
        },
        onDeleteCategory: function (oEvent) {
            const oList = this.getView().byId("idList");
            const oSelectedItem = oList.getSelectedItem();
            const oObj = oSelectedItem.getBindingContext().getObject();
            var oModel = this.getView().getModel();
            oModel.setUseBatch(false);
            oModel.remove(`/Categories(${parseInt(oObj.ID)})`, {
                success: oData => {
                    debugger
                    MessageBox.success("Deleted Successflly");
                },
                error: oError => {
                    debugger
                    MessageBox.error("Error Successflly");
                }
            });
        },

        onNavToSecondPage: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Second")

        }


    });
});