const request = require('request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoidHlwaXgiLCJhIjoiY2p3MjN5c3A3MHNxZTQ0cXYxbWJ0eHVyeiJ9.8RNm9SD3hThNqbSU6kTV4g&limit=1'

    request({url, json: true}, (error, response) => {
        const {features} = response.body
        if (error) {
            callback('Unable to connect with location service')
        } else if (features.length === 0) {
            callback('Unable to find location. Try edit your location') 
        } else {
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode