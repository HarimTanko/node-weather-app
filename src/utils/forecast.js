const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6217c4f41350b204f6864b4561206742&query=' + long + ',' + lat + '&units=m'

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('unable to connect to forecast services', undefined)
        }else if (body.error) {
            callback('unable to find location', undefined)
        }else {
            callback(undefined, 
                body.current.weather_descriptions[0] + '. its currently ' + body.current.temperature + ' degrees but it feels like ' + body.current.feelslike + ' degrees')
        }

    })
}

module.exports = forecast