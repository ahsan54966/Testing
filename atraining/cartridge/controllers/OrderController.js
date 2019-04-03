/**
* Description of the Controller and the logic it provides
*
* @module  controllers/JShowProduct
*/

'use strict';
var ISML = require('dw/template/ISML');
var guard = require('app_sitegenesis_controllers/cartridge/scripts/guard');
var ProductMgr=require('dw/catalog/ProductMgr');
function start() {
	var parameterId ='P0048';
	var product = ProductMgr.getProduct(parameterId);
		var errorMsg=dw.web.Resource.msgf('productnotfoundMsg', 'myBundle', null,parameterId);
		ISML.renderTemplate(
		'Order.isml',
		{
			myProduct:product
		}
		);
		
}
exports.Start = guard.ensure(['get'], start);

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

