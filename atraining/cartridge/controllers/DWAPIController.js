2/**
* Description of the Controller and the logic it provides
*
* @module  controllers/JShowProduct
*/

'use strict';
var ISML = require('dw/template/ISML');
var guard = require('app_sitegenesis_controllers/cartridge/scripts/guard');
var ProductMgr=require('dw/catalog/ProductMgr');
function start() {
	var parameterId ='25518837';
	var product = ProductMgr.getProduct(parameterId);
		var errorMsg=dw.web.Resource.msgf('productnotfoundMsg', 'myBundle', null,parameterId);
		ISML.renderTemplate(
		'DWAPI.isml',
		{
			myProduct:product
		}
		);
		
}
function productmodel() {
	var parameterId ='25518837';
	var product = ProductMgr.getProduct(parameterId);
		var errorMsg=dw.web.Resource.msgf('productnotfoundMsg', 'myBundle', null,parameterId);
		ISML.renderTemplate(
		'DWAPIProductAttributeModel.isml',
		{
			myProduct:product
		}
		);
		
}
function pricemodel() {
	var parameterId ='P0048';
	var product = ProductMgr.getProduct(parameterId);
		var errorMsg=dw.web.Resource.msgf('productnotfoundMsg', 'myBundle', null,parameterId);
		ISML.renderTemplate(
		'DWAPIPriceModel.isml',
		{
			myProduct:product
		}
		);
		
}
function searchmodel() {
	var parameterId ='P0048';
	var product = ProductMgr.getProduct(parameterId);
		var errorMsg=dw.web.Resource.msgf('productnotfoundMsg', 'myBundle', null,parameterId);
		ISML.renderTemplate(
		'DWAPISearchModel.isml',
		{
			myProduct:product
		}
		);
		
}
exports.atrmodel = guard.ensure(['get'], productmodel);
exports.Start = guard.ensure(['get'], start);
exports.Price = guard.ensure(['get'], pricemodel);
exports.Search = guard.ensure(['get'], searchmodel);

// HINT: do not put all require statements at the top of the file
// unless you really need them for all functions

/**
* Description of the function
*
* @return {String} The string 'myFunction'
*/
// var myFunction = function(){
//     return 'myFunction';
// }

/* Exports of the controller */
///**
// * @see {@link module:controllers/JShowProduct~myFunction} */
//exports.MyFunction = myFunction;

