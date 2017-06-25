const KrakenClient = require('kraken-api')
const request = require('request');
const Poloniex = require('poloniex.js')
require('dotenv').config()
const poloniex = new Poloniex();

var date = new Date()
var start = Math.round(date.getTime()/1000-864000)
var end = Math.round(date.getTime()/1000)

poloniex.returnChartData('USDT', 'BTC', 300, start , end, function(err, data){
    
    }
)
console.log(start)