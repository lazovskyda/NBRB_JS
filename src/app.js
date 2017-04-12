'use strict';


(function(){

const NBRBURL = "http://www.nbrb.by/API/ExRates/";
let Client = require('node-rest-client').Client;
let client = new Client();

let currencesID = [];
let firstRate;
let secondRate;
let currencyRateTemp;



function initCurrencyList() {

    client.registerMethod("jsonMethod", NBRBURL + "Currencies/", "GET");

    client.methods.jsonMethod(function (data, response) {
        delUndefItem("firstCurrency");
        delUndefItem("secondCurrency");


        for (let i = 0; i < data.length; i++) {

            currencesID[i] = data[i].Cur_ID;

            let z = document.createElement("option");
            z.setAttribute("value", data[i].Cur_ID);
            let t = document.createTextNode(data[i].Cur_Name);
            let z2 = z.cloneNode();
            let t2 = t.cloneNode();

            z.appendChild(t);
            z2.appendChild(t2);

            document.getElementById("firstCurrency").appendChild(z);
            document.getElementById("secondCurrency").appendChild(z2);
        }

        getCurrencyRates(145)
            .then((currencyRate) => {
                firstRate = currencyRate;
                console.log("firstRate=" + firstRate);
            })
            .catch(error => console.log(error));


        getCurrencyRates(145)
            .then((currencyRate) => {
                secondRate = currencyRate;
                console.log("firstRate=" +  secondRate);
            })
            .catch(error => console.log(error));

    });

}

function getCurrencyRates(currencyID) {
    console.info(currencyID);
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
    // console.log("delUndefItem");
    if (document.getElementById(elementID).firstElementChild.value === "undefined") {
        document.getElementById(elementID).firstElementChild.remove();

    }
}

//temp
/*function getCurrencyRatesInit() {
 let m = 145;
 getCurrencyRates(m);
 }*/
//-temp end


function currencyInit() {
    //getCurrencyRates
}


//let m =145;
//document.getElementById("testButton").addEventListener("click", getCurrencyRatesInit);

document.getElementById("testButton").addEventListener("click", initCurrencyList);

initCurrencyList();

//currencyInit();
//getCurrencyRates();

})();

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