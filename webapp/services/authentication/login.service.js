sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (JSONModel, DataService, Filter, FilterOperator) {
	"use strict";

	return {
		getUser: function (oModel) {
			var that = this;
			return new Promise(function (resolve, reject) {
				that.getUsuario(oModel).then(function (result) {
					var user = {
						username: result.sUser,
						email: result.sEmail
					};
					if (user.username === "") {
						user.email = "leonel.eduardo.rojas.aranda@everis.com";
						user.username = "CO71522014";
					}
					resolve(user);
				}, function (error) {
					reject(error);

				});
			});
		},

		getUsuario: function (oModel) {
			return new Promise(function (resolve, reject) {
				oModel.read("/Usuario", {
					success: function (oResponse) {
						resolve(oResponse.results[0]);
					},
					error: function (oError) {
						reject(oError);
					}
				});
			});
		}

	};
});