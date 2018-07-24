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


const callSF = async () => {
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
                   "Salutation":"03",
                   "FirstName":"5445454",
                   "LastName":"Test212",
                   "Firstname2__pc":null,
                   "Lastname2__pc":null,
                   "PersonEmail":"samyuktha212.p@valtech.co.in",
                   "LocalHomePhone__pc":"08026079773",
                   "HomePhoneCountrycode__pc":"IN",
                   "LocalMobilePhone__pc":"09008145489",
                   "MobilePhoneCountryCode__pc":"IN",
                   "LocalWorkPhone__pc":"09845152777",
                   "WorkPhoneCountryCode__pc":"IN",
                   "Can_Be_Contacted_By_Email__pc":true,
                   "Can_Be_Contacted_By_Phone__pc":false,
                   "Can_Be_Contacted_By_SMS__pc":true,
                   "Can_Be_Contacted_By_Mail__pc":false,
                   "PrimaryAddressLine1__pc":"Test Address",
                   "PrimaryAddressLine2__pc":"address line 2",
                   "PrimaryAddressLine3__pc":"address line 3",
                   "PrimaryCity__pc":"Paris",
                   "PrimaryZipCode__pc":"75001",
                   "PrimaryStateProvince__pc":null,
                   "NationalityCountryCode__pc":"FRA"
                },
                "Instructions":[  
                   {  
                      "Line__c":"0",
                      "InstructionCode__c":"00587",
                      "Instruction_Name__c":"RICUCIRE PARZIALMENTE (<5 CM.)",
                      "Quantity__c":"1",
                      "Initial_Price__c":"25",
                      "Updated_Price__c":"0"
                   }
                ], 
                
               "ExternalId__c":"9517452521",
               "TransactionId__c":"o3736323",
               "StoreRetailCode__c":"A06",
               "CA_Name__c":"Jeremy M",
               "CA_Code__c":"JM0726",
               "MyRepair_CreatedDate__c":"2012-09-29",
               "MyRepairStatus__c":"Shipped to store",
               "Red_Code__c":false,
               "Yellow_Code__c":false,
               "FollowupBy_Call__c":false,
               "FollowupBy_Email__c":false,
               "FollowupBy_Chat__c":true,
               "SKU__c" :"M66568",
               "Product_Name__c":"PF.INSOLITE MONOG VIOLET",
               "Product_Family__c":"Leather goods",
               "Lead_Time__c":"1",
               "Delivery_Date__c":"",
               "Updated_Delivery_Date__c":"",
               "TotalAmount__c":"25",
               "TotalAmount_Updated__c":"0",
               "CurrencyCode__c":"EUR",
               "Store_Comment__c":"",
               "Client_Comments__c":"Gesto commerciale autorizza Piazzi",
               "Followup_Comments__c":"W3siRGF0ZSIgOiIyMDE4LTA3LTA5IiAsIlNBQ29kZSIgOiAiYWxmYSIgLCAiQ29tbWVudCIgOiAiY29tbWVudDEifV0=",
               "Repair_Center_Comments__c":"",
               "NS_Code__c":"NS005",
               "NS_Code_Description__c":"The material can be unflexible, dehydrated, damaged, not clean or has severe cracking.The condition of the product doesn't allow for a repair. ",
               "Type_of_Repair__c":"Standard repair",
               "Delivery_Address__c":""
                
          }`
        };
    }
    
    
    
    try{
        var promises = [];
        console.log("enter2");
        var arrayValues = Array.from(Array(10).keys());

        arrayValues.map( (index) => promises.push(
            fetch(`${url}`,getPOSTobject(index)))
        );

        Promise.all(promises).then(function(values) {
            console.log(values);
          });

    } catch(err){
        console.log("error2")
        console.log(err)
        throw err;
    }
    
}



app.post('/sendRequests', async function(req, res){
    var body = req.body;
    res.set('Content-Type', 'application/json');
    try{
        console.log("enter")
        callSF();
        res.send('sent');
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


