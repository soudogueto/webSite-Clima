const request = require('request');

const geoData = (address, callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic291ZG9ndWV0byIsImEiOiJjanRoamtvbnUwYXNsNGFwNWswNWEycHY1In0.TmA0JX_1xWG0MTijm5qEow&limit=1`;
    request(url, (error, response) =>{
        const data = JSON.parse(response.body)
        if(error){
            callback('Falha ao conectar no serviço local!', undefined)
        }else if(data.features.length === 0){
                    callback('Localização não encontrada. Tente outro local!', undefined)
                }
        else {
            callback(undefined, {
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                localização: data.features[0].place_name
            })
        }
    })
}

module.exports = geoData

