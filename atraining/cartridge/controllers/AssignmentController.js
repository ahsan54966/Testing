'use strict';

/* API Includes */
var Status = require('dw/system/Status');
/* Script Modules */

var app = require('app_sitegenesis_controllers/cartridge/scripts/app');
var guard = require('app_sitegenesis_controllers/cartridge/scripts/guard');
var ISML = require('dw/template/ISML');
var txn = require('dw/system/Transaction');
var URLUtils = require('dw/web/URLUtils');
var Mail= require('dw/net');
//importPackage(dw.net);
//importPackage(dw.system);

	function MailForm() {
		app.getForm('FirstTaskMail').clear();
		app.getView({
		    ContinueURL: URLUtils.https('AssignmentController-HandleForm')
		    }).render('FirstTaskMail');
	}
	function Success() {
		ISML.renderTemplate('Success.isml');
	}
	function handleForm() {
	    app.getForm('FirstTaskMail').handleAction({
	        submit: function (formgroup) {
	       	 var mail: Mail = new dw.net.Mail();
	   	     mail.addTo(formgroup.email.value);
	   	     mail.setFrom("ahsansiddiquewarraich@gmail.com");
	   	     mail.setSubject("Email Sending");
	   	     // sets the content of the mail as plain string
	   	     mail.setContent("<html><head><title>Welcome</title></head><body><b>Thank you</b> for choosing us! your password is "+formgroup.Password.value+"</body></html>","text/html","UTF-8");
	   	     mail.send();
	        		
		            app.getForm('FirstTaskMail').clear();
		    	    response.redirect(URLUtils.https('AssignmentController-Success'));	    	    
		    	    

	        },
	        error: function () {
	            // No special error handling if the form is invalid.
	        	app.getView({
	    		    ContinueURL: URLUtils.https('AssignmentController-HandleForm')
	    		    }).render('FirstTaskMail');
	        }
	    });
	}
	
exports.Start = guard.ensure(['get'], MailForm);
exports.HandleForm = guard.ensure(['post'], handleForm);
exports.Success = guard.ensure(['get'], Success);

