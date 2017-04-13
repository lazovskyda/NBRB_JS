'use strict';
//require('./testImportCSS.css');
//import './testImportCSS.css'
//require('../node_modules/js-datepicker/datepicker.css');

(function () {

    const NBRBURL = "http://www.nbrb.by/API/ExRates/";
    let Client = require('node-rest-client').Client;
    let client = new Client();

//    let Datepicker = require('js-datepicker');
    //let TestImport = require('./testImport');

    let currencesID = [];
    let firstRate;
    let secondRate;
    let currencyRateTemp;

    var validCurrences = [];

    function initCurrencyList() {

        client.registerMethod("jsonMethod", NBRBURL + "Currencies/", "GET");

        client.methods.jsonMethod(function (data, response) {
            delUndefItem("firstCurrency");
            delUndefItem("secondCurrency");
            let count = 0;

            for (let i = 0; i < data.length; i++) {




//check value if haven't value then skip
                (function checkValue(currencyID) {

                    getCurrencyRates(currencyID)
                        .then((currencyRate) => {

                            let obj = {};
                            obj.id = currencyID;
                            obj.rate = currencyRate;
                            validCurrences[count] = obj;

                            let z = document.createElement("option");
                            z.setAttribute("value", count);
                            let t = document.createTextNode(data[i].Cur_Name);
                            let z2 = z.cloneNode();
                            let t2 = t.cloneNode();

                            z.appendChild(t);
                            z2.appendChild(t2);

                            document.getElementById("firstCurrency").appendChild(z);
                            document.getElementById("secondCurrency").appendChild(z2);


                            if(count == 0){
                                calculateRate();
                            }

                            count++;

                        })
                        .catch(error =>

                            console.log(error)
                    );


                })(data[i].Cur_ID);

            }

        });

    }

    function getCurrencyRates(currencyID) {
        //console.info(currencyID);
        let promise = new Promise(function (resolve, reject) {
            client.registerMethod("jsonMethod", NBRBURL + "Rates/" + currencyID, "GET");

            let req = client.methods.jsonMethod(function (data, response) {
                console.log(response);
                if (response.statusCode == 404) {
                    reject('Error 404');
                }
                else {
                    resolve(data.Cur_OfficialRate);
                }
            });

        });

        return promise;
    }


    function delUndefItem(elementID) {
        if (document.getElementById(elementID).firstElementChild.value === "undefined") {
            document.getElementById(elementID).firstElementChild.remove();

        }
    }


    // document.getElementById("testButton").addEventListener("click", initCurrencyList);

    function check() {

        console.log(`---------------------------ïûù----------------------------------------`);

        console.log(validCurrences);

    }

    initCurrencyList();

    setTimeout(check, 5000);


    document.getElementById("firstCurrency").onchange = function(){
        calculateRate();
    };
    document.getElementById("secondCurrency").onchange = function(){
        calculateRate();
    };



    function calculateRate(){
        let totalRate;
        totalRate = validCurrences[document.getElementById("firstCurrency").value].rate / validCurrences[document.getElementById("secondCurrency").value].rate;
        document.getElementById("outputCurrency").innerHTML = totalRate;
    }


})();





//document.getElementById("testButton").addEventListener("click", checkSelect);


//!!!!!!!!!EXAMPLE OF GLOBAL ACCESS TO A MODULE FROM PASHA
//(function (application, root) {
//
//    var boo = function () {
//    };
//
//    application['foo'] = function () {
//        boo();
//        console.log('sssss');
//    };
//
//    root['app'] = application;
//})({}, window);
//
//app.foo();

//!!!!!!!!!END EXAMPLE OF GLOBAL ACCESS TO A MODULE FROM PASHA