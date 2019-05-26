const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/203be053efe1fdd6505f74baeaf76d4e/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '?units=si'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect with weather service')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, body)
            console.log('z forecast', body)
        }
    })
}

module.exports = forecast