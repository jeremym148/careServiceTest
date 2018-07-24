var https = require('https');
var fs = require('fs');
var fetch = require('node-fetch');
var express = require('express');
var bodyParser = require('body-parser')
const Wsdlrdr = require('wsdlrdr');
const R = require('ramda');
var BodyReqUtils = require('./BodyReqUtils');
var BodyParseResUtils = require('./BodyParseResUtils');
const moment = require('moment');

var app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var port = process.env.PORT || 8080;


const callSF = async (qty) => {
    var url = `https://louisvuitton--icon.cs77.my.salesforce.com/services/apexrest/CareService/`;

    var getPOSTobject = (index) =>{
        let name = moment().format('x')+index;
        console.log(name);
        return { method: 'POST', headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 00D0t0000004ZF6!AR0AQIvFzVNZ1t93wyolqdlU010pTsfzqew0YfBavtj.itwWA3jBflPHBjJ8DeyKsZnMv49FQ40_iRpEwgNbEqiGt4MBcSY4`
            },
            body: `{  
                "Client":{  
                   "FirstName":"54454",
                   "LastName":"Test2",
                   Lastname2__pc":"null",
                    "Firstname2__pc":"null",
                    "PersonEmail":"samyuktha.p@valtech.co.in",
                    "LocalHomePhone__pc":"null",
                    "LocalMobilePhone__pc":"(91)09008145489",
                    "MobilePhoneCountryCode__pc":"",
                    "LocalWorkPhone__pc":"null",
                    "WorkPhoneCountryCode__pc":"",
                    "Can_Be_Contacted_By_Email__pc":true,
                    "Can_Be_Contacted_By_Phone__pc":false,
                    "Can_Be_Contacted_By_SMS__pc":false,
                    "Can_Be_Contacted_By_Mail__pc":false,
                    "PrimaryAddressLine1__pc":"Test Address",
                    "PrimaryAddressLine2__pc":"address line 2",
                    "PrimaryAddressLine3__pc":"address line 3",
                    "PrimaryCity__pc":"Paris",
                    "PrimaryZipCode__pc":"75001",
                    "PrimaryStateProvince__pc":""
                }, 
               "ExternalId__c":"${name}",
               "StoreRetailCode__c":"A06",
               "CA_Name__c":"Freida Pinto s.",
                "CA_Code__c":"FRSE",
                "MyRepair_CreatedDate__c":"2018-06-14",
                "MyRepairStatus__c":"Draft",
                "Red_Code__c":false,
                "Yellow_Code__c":false,
                "FollowupBy_Call__c":false,
                "FollowupBy_Email__c":true,
                "FollowupBy_Chat__c":false,
                "SKU__c":"M53000",
                "Product_Name__c":"SUPER PRESIDENT CLASSEUR",
                "Product_Family__c":"RIG",
                "Lead_Time__c":"3",
                "Delivery_Date__c":"2018-07-05",
                "Updated_Delivery_Date__c":"",
                "TotalAmount__c":"8100",
                "TotalAmount_Updated__c":"8100",
                "CurrencyCode__c":"INR",
                "Store_Comment__c":"",
                "Client_Comments__c":"",
                "Repair_Center_Comments__c":"",
                "Type_of_Repair__c":"Standard
                
          }`
        };
    }
    
    
    
    try{
        var promises = [];
        console.log("enter2");
        var arrayValues = Array.from(Array(qty).keys());

        arrayValues.map( (index) => promises.push(
            fetch(`${url}`,getPOSTobject(index)))
        );

        await Promise.all(promises).then(function(values) {
            console.log(values);
            return values;
          })
          .catch(reason => { 
            console.log(reason)
          });

    } catch(err){
        console.log("error2")
        console.log(err)
        throw err;
    }
    
}



app.post('/sendRequests', async function(req, res){
    var qty = req.body.qty;
    res.set('Content-Type', 'application/json');
    try{
        console.log("enter")
        var data = await callSF(qty);
        res.send(data);
    } catch(err){
        console.log("error")
        console.log(err)
        res.status(500).send({ error: err.message });
        // res.sendStatus(500).send(err.message);
    }
    
});



app.listen( port, function () {
    console.log( 'Express server listening on port ' + port );
} );


