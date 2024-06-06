sap.ui.define(
    [
        "sap/ui/core/mvc/Controller", 
        "sap/ui/model/json/JSONModel",
        "com/odl/rondas/services/authentication/login.service"
    ],
    function(BaseController,JSONModel, loginService) {
      "use strict";
      var that;
      return BaseController.extend("com.odl.rondas.controller.App", {
        onInit: function() {
          that = this;
          var menu = {
            selectedKey: "Page2",
            navigation: [{
              title: "Actividades",
              icon: "sap-icon://home",
              expanded: false,
              key: "actividad"
            }, {
              title: "Ronda",
              icon: "sap-icon://action-settings",
              expanded: false,
              key: "ronda"
            }, {
              title: "Sistemas",
              icon: "sap-icon://company-view",
              expanded: false,
              key: "sistema"
            }, {
              title: "Usuarios",
              icon: "sap-icon://employee-pane",
              expanded: false,
              key: "usuario"
            }],
            fixedNavigation: [{
              title: "Auditoria",
              icon: "sap-icon://arobase",
              expanded: false,
              key: "auditoria"
            }],
            headerItems: [{
              text: "File"
            }, {
              text: "Edit"
            }, {
              text: "View"
            }, {
              text: "Settings"
            }, {
              text: "Help"
            }]
          };
    
          var oModel = new JSONModel(menu);
    
          this.getView().setModel(oModel, "menu");
        }
        , 
        onAfterRendering: function () {
          loginService.getUser(this.getView().getModel()).then(function (result) {
            sap.ui.getCore().setModel(new JSONModel(result), "userModel");
            that.getView().setModel(new JSONModel(result), "userModel");
          }, function (error) {}.bind(this));
        },
    
        onItemSelect: function (oEvent) {
          var oItem = oEvent.getParameter("item");
          var sKey = oItem.getKey();
          //			this.onSideNavButtonPress();
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo(sKey);
        },
    
        onSideNavButtonPress: function () {
          var oToolPage = this.byId("app");
          var bSideExpanded = oToolPage.getSideExpanded();
          this._setToggleButtonTooltip(bSideExpanded);
          oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        },
    
        _setToggleButtonTooltip: function (bSideExpanded) {
          var oToggleButton = this.byId("sideNavigationToggleButton");
          var sTooltipText = bSideExpanded ? "Expandir Menu" : "Colapsar Menu";
          oToggleButton.setTooltip(sTooltipText);
        }
      });
    }
  );
  