//CONSTS AND VARS
const DEFAULT_BASE_CURRENCY_CODE = 'USD';

//API Providers
const ipdata = {
    key: '074bb7ffe1fb62bb3e968d317be20b3d1c1c8c01cebb4745272a8893',
    baseurl : 'https://api.ipdata.co',
    currency: function(){
        return `${this.baseurl}/currency?api-key=${this.key}`;
    },
};

const currencyLayer = {
    key : 'YpXbS5yzNbg0PuaVoK9G0h9SB611GqZP',
    baseurl : 'https://api.apilayer.com',
    convert : function(fromCurrencyCode, toCurrencyCode, amount){
        return `${this.baseurl}/exchangerates_data/convert?to=${toCurrencyCode}&from=${fromCurrencyCode}&amount=${amount}&apikey=${this.key}`;
    },
    list : function(){
        return `${this.baseurl}/exchangerates_data/symbols?apikey=${this.key}`
    }
};

// Get Users Currency
async function getUserCurrency(){
    const res = await fetch(ipdata.currency());
    const userCurrency = await res.json();

    return userCurrency;
}

//Get Currencies
async function getCurrencies(){
    const res = await fetch(currencyLayer.list());
    const data = await res.json();

    return data.symbols;
}

//Get Exchange Rate
async function getExchangeRate(fromCurrencyCode, toCurrencyCode){
   const amount = 1;
   const res = await fetch(currencyLayer.convert(fromCurrencyCode, toCurrencyCode, amount));
   const data = await res.json();
   return data.result;
}
getExchangeRate('USD','GBP');

//RenderExchangeRate
function renderExchangeRate(fromCurrencyCode, toCurrencyCode){
    console.log(fromCurrencyCode, toCurrencyCode);
}
// INTI App
async function inti(){
    const userCurrency = await getExchangeRate();
    //Render Exchange Rate
    renderExchangeRate(DEFAULT_BASE_CURRENCY_CODE, userCurrency.code);
    //Render Select Options
    //Convert 
}
inti();