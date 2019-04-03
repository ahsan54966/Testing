'use strict';

/* API Includes */
var Status = require('dw/system/Status');
/* Script Modules */

var app = require('app_sitegenesis_controllers/cartridge/scripts/app');
var guard = require('app_sitegenesis_controllers/cartridge/scripts/guard');
var ISML = require('dw/template/ISML');
var DriverMgr = require('dw/object/CustomObjectMgr');
var txn = require('dw/system/Transaction');
var URLUtils = require('dw/web/URLUtils');

//var basket=BasketMgr.currentBasket;

//	DriverMgr.getCustomObject('Driver',1);	
	function start() {
		app.getForm('FirstForm').clear();
		app.getView({
		    ContinueURL: URLUtils.https('DriverController-HandleForm')
		    }).render('FirstForm');
	}
	function EditForm() {
		app.getForm('FirstForm').clear();
		var driver=DriverMgr.getCustomObject("Driver",request.httpParameterMap.DriverId.stringValue);
			
       app.getForm('FirstForm').copyFrom(driver);
		app.getView({
		    ContinueURL: URLUtils.https('DriverController-HandleForm')
		    }).render('EditForm');
	}
	
	function Index(){
		var drivers=DriverMgr.getAllCustomObjects("Driver");
		ISML.renderTemplate('Index.isml',{Drivers:drivers});
	}
	function DeleteDriver(){
		txn.wrap(function(){
		var driver=DriverMgr.getCustomObject("Driver",request.httpParameterMap.DriverId.stringValue);
		DriverMgr.remove(driver);
	    response.redirect(URLUtils.https('DriverController-Index'));
		});
		
	//	ISML.renderTemplate('Index.isml',{Drivers:drivers});
	}
	function CheckCach(){
		ISML.renderTemplate('cachedpage.isml');
	}
	function IncluseCach(){
		ISML.renderTemplate('CashInclude.isml');
	}
	
	function handleForm() {
	    app.getForm('FirstForm').handleAction({
	        cancel: function () {
	            app.getForm('FirstForm').clear();
	            // No special error handling if the form is invalid.
	        	app.getView({
	    		    ContinueURL: URLUtils.https('DriverController-HandleForm')
	    		    }).render('FirstForm');
	        }, 
	        submit: function (formgroup) {
	        	txn.wrap(function(){
	        		//for maping
	                //app.getForm('profile.customer.firstName') = copyFrom(customer.profile);
	                //app.getForm('billing.billingAddress.addressFields.states').copyTo(billingAddress);
	        		// for editing
	        		//var driver=DriverMgr.getCustomObject("Driver",dw.util.UUIDUtils.createUUID());
	        		
	        		var driver=DriverMgr.createCustomObject("Driver",dw.util.UUIDUtils.createUUID());
                    //app.getForm('FirstForm').copyFrom(driver);
	        		driver.custom.DriverName=formgroup.DriverName.value;
	        		driver.custom.PhoneNumber=formgroup.PhoneNumber.value;
	        		driver.custom.DriverCatagory=formgroup.DriverCatagory.value;
	        		driver.custom.Salary=formgroup.Salary.value;
	        		driver.custom.DOB=formgroup.DOB.value;
	        		
		            app.getForm('FirstForm').clear();
		    	    response.redirect(URLUtils.https('DriverController-Index'));
	        		
	        	//	var customer=ProductMgr.createCustomer("ahsan871@gmail.com","ahsansab149A@");
	        		//customer.note="Ahsan Warraich";
	        	});

	        },
	        update: function(formgroup) {
	        	txn.wrap(function(){
        		var driver=DriverMgr.getCustomObject("Driver",formgroup.DriverId.value);
        		driver.custom.DriverName=formgroup.DriverName.value;
        		driver.custom.PhoneNumber=formgroup.PhoneNumber.value;
        		driver.custom.DriverCatagory=formgroup.DriverCatagory.value;
        		driver.custom.Salary=formgroup.Salary.value;
        		driver.custom.DOB=formgroup.DOB.value;
        		
	            app.getForm('FirstForm').clear();
	    	    response.redirect(URLUtils.https('DriverController-Index'));
	        	});
	        },
	        error: function () {
	            // No special error handling if the form is invalid.
	        	app.getView({
	    		    ContinueURL: URLUtils.https('DriverController-HandleForm')
	    		    }).render('FirstForm');
	        }
	    });
	}
	
exports.CachePage=guard.ensure(['get'],CheckCach)
exports.Start = guard.ensure(['get'], start);
exports.HandleForm = guard.ensure(['post'], handleForm);
exports.IncluseCach= guard.ensure(['get'], IncluseCach);
exports.Index=guard.ensure(['get'], Index)
exports.EditForm = guard.ensure(['get'], EditForm);
exports.DeleteDriver = guard.ensure(['get'], DeleteDriver);