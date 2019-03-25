const request = require('request');
const chalk = require('chalk');

const forecast = (latitude, longitude, language, callback) => {
    const url = `https://api.darksky.net/forecast/1602e381a94491ded4f1838cbf2e6dc6/${latitude},${longitude}?exclude=flags&units=si&lang=${language}`
    request(url, (error, response) => {
        const data = JSON.parse(response.body)
        if(error){
            callback(error, undefined)
        }else if(data.message) {
                callback(data.message, undefined)
            }
        else{
            const sumario = data.daily.summary;
            const temperatura = data.currently.temperature;
            const tempo = data.daily.data[0].precipType;

           return  callback(undefined, `Previsão: ${sumario}`)
        }
    })
}

module.exports = forecast