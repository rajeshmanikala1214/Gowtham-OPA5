sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
     "com/sap/btp/zcurdapp/zopa/model/models"
], (Controller, MessageBox,models) => {
    "use strict";

    return Controller.extend("com.sap.btp.zcurdapp.zopa.controller.Second", {
        onInit() {

            // console.log(this.getOwnerComponent())
// const oRouter = this.getOwnerComponent().getRouter();
// 	oRouter.getRoute("Second").attachMatched(this._onRouteMatched, this);

        },

        _onRouteMatched: function(){

        },
        onBacknavigation: function(){
            const oRouter =  this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteMain")

        }

       

    });
});