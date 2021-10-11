const weatherToken = process.env.WEATHER_API_ACCESS_TOKEN
const request = require('postman-request')

// Get the current weather in an area based on longitude and latitude.
const weatherRequest = (longitude, latitude, callback) => {

    const weatherURL = `http://api.weatherstack.com/current?access_key=${weatherToken}&query=${latitude},${longitude}&units=f`
    
    request({ url: weatherURL, json: true }, (error, data) => {

        if (error) {

            console.log('Issue connecting to weatherstack API')
            console.log('Error Code: ' + error.code)
            console.log('Error: ' + error.error)

        } else if (data.body.error) {

            const {body: {success, error: resError } } = data

            const errorData = {
                success,
                code: resError.code,
                errorMessage: resError.info
            }

            callback(errorData)

        } else {

            const { body: { current:{ weather_descriptions: weatherDescriptions, weather_icons: weatherIcon, temperature, humidity, feelslike: feelsLike }, error:resError } } = data

            const weatherData = {
                weather: weatherDescriptions[0].toLowerCase(),
                temperature,
                feelsLike,
                humidity,
                weatherIcon
            }
        
            callback(weatherData)
        }
    })
}

module.exports = {

    weatherRequest: weatherRequest
    
}
