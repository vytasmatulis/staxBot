const { Command } = require('discord.js-commando');
const Poloniex = require('poloniex.js')
require('dotenv').config()
const Commando = require('discord.js-commando')

const plot = require('plotter').plot;

const poloniex = new Poloniex();
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'price',
            group: 'crypto',
            memberName: 'price',
            description: 'Return price',
            args: [
                {
                    key: 'curr1',
                    prompt: 'currency 1',
                    type: 'string'
                },
                {
                    key: 'curr2',
                    prompt: 'currency 2',
                    type: 'string'
                }
            ]
        });
    }
    run(msg, {curr1, curr2}, client) {
   
        var date = new Date()
        var start = Math.round(date.getTime()/1000-864000)
        var end = Math.round(date.getTime()/1000)
            poloniex.returnChartData(curr1, curr2, 300, start , end, function(err, data){

               var values = {}
                data.forEach(function(o){
                    values[parseInt(o.date)] = o.low
                })

                var date={}
                date[curr1+'-'+curr2]=values                     
                plot({
                    data: date,
                    filename:	'pricegraph.png',
                    time: '%d/%H/%M',
                    finish: function(){
                        return msg.channel.sendFile('./pricegraph.png', 'pricegraph.png')

                    }
                })

                
                    
                }
            )
 
    }
};