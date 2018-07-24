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
                   "FirstName":"54454",
                   "LastName":"Test2",
                   "PersonEmail":"samp@va.in"
                }, 
               "ExternalId__c":"${name}",
               "StoreRetailCode__c":"A06",
                
          }`
        };
    }
    
    
    
    try{
        var promises = [];
        console.log("enter2");
        var arrayValues = Array.from(Array(5000).keys());

        arrayValues.map( (index) => promises.push(
            fetch(`${url}`,getPOSTobject(index)))
        );

        await Promise.all(promises).then(function(values) {
            console.log(values);
            return values;
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
        var data = await callSF();
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


