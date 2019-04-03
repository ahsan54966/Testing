/**
* A hello world controller. This file is in cartridge/controllers folder
* @module controllers JHelloWorld
*/
var Logger = require('dw/system/Logger');
var guard = require('app_sitegenesis_controllers/cartridge/scripts/guard');
var ISML = require('dw/template/ISML');
var pipeobj=require('dw/system/Pipeline')
var weatherServiceObj = require("~/cartridge/scripts/weatherservice.ds");
function testDOM() {
	ISML.renderTemplate( 
			'TestDom.isml', {
			Param:
			"Dom is working"
			}
			);
}
function start() {
	//pipeobj.execute('TestController-Start');
	 

  	ISML.renderTemplate( 
			'Hello', {
			myParameteronISML:
			"Hello from Controllers"
			}
			);
 


};
function start2() {
	ISML.renderTemplate(
			'a1.isml'
			);
};
function afzal() {
	ISML.renderTemplate(
			'a1.isml',{
				ahsang:"Hi ahsn sab"
			}
			); 
};
function testlogger() {
	var log=Logger.getLogger("Ahsan","Driver");
	
	try
	{
		ISML.renderTemplate(
				'a12.isml',{
					ahsang:"Hi ahsn sab"
				}
				);	
	}
	catch(e)
	{
		log.debug("My custom Error",e.causeMessage);
		log.error("My Error and Fatal Error",e.causeMessage);

	}
	

};
function callService() {
	var sitePrefs  = dw.system.Site.getCurrent().getPreferences().custom.ServiceTimeOut;
	var service = weatherServiceObj.WeatherStatus; 
	//var url = service.URL;
	//service.setURL(url);
	var response = service.call();
	var dataj=JSON.parse(response.object.text);
	ISML.renderTemplate('WeatherData.isml',{
		wdata:dataj
	});
	
};

exports.DOM = guard.ensure(['get'], testDOM);
exports.looger = guard.ensure(['get'], testlogger);
exports.Afzal = guard.ensure(['get'], afzal);
exports.Start = guard.ensure(['get'], start);
exports.Start2 = guard.ensure(['get'], start2);
exports.Call = guard.ensure(['get'], callService);