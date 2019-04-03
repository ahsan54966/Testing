
var svc = require('dw/svc');

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
   /**
    *
    * HTTP Services
    *
    */  
	
	var healthStatus = LocalServiceRegistry.createService("weather_service", {
		createRequest: function(svc:HTTPService, args){
			svc.setRequestMethod("GET");
		},
		parseResponse: function(svc:HTTPService, client:HTTPClient) {
			return client;
		}
	});
	
exports.HealthStatus = healthStatus;


