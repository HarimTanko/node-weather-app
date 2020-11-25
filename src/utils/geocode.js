const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieW9naS1tYWktdG91Y2hlcyIsImEiOiJja2hwMTB3NmgxNmhlMndteHo2ZXZpeWQ1In0.aPlPQVefZIbAwcd9ZPBOpA&limit=1'

    request({url, json:true}, (error, { body }) => {
        if(error) {
            callback('unable to connect to location services', undefined)
        }else if (body.features.length === 0) {
            callback('cannot find location try again', undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode