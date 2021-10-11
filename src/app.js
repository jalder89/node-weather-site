require('dotenv').config()
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geomap = require('./utils/geomap')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const templateDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views directory
app.set('view engine', 'hbs')
app.set('views', templateDirPath)
hbs.registerPartials(partialsDirPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        page: 'Weather',
        message: 'Welcome to The Weather App!',
        name: 'William Barnes'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        page: 'About',
        name: 'William Barnes'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        page: 'Help',
        message: `This is a simple app for fetching the current weather in a given location.
        You can provide a location descriptor such as zip, state, city, or address and the app will fetch the current weather for that location.`,
        name: 'William Barnes'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.location) {
        
        return res.send({
            statusCode: '422',
            error: 'You must provide a location for weather.',
            name: 'William Barnes'
        })  
    }

    geomap.geoRequest(req.query.location, (data) => {

        const {longitude, latitude, place, errorMessage = undefined, statusCode = undefined} = data

        if (errorMessage != undefined) {

            return res.send({
                statusCode,
                error: errorMessage,
                name: 'William Barnes'
            })
        }

        weather.weatherRequest(longitude, latitude, (data) => {

            const {weather, weatherIcon, temperature, feelsLike, humidity, errorMessage = undefined, code = undefined} = data

            if (errorMessage) {

                return res.send({
                    statusCode: 401,
                    error: errorMessage,                
                    name: 'William Barnes'                
                })            
            }
            
            res.send({
                location: place,
                weatherIcon,
                forecast: `It is currently ${weather} with a temperature of ${temperature} degrees. It feels like ${feelsLike} degrees with a humidity of ${humidity}%.`,
                name: 'William Barnes'
            })
        })        
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        statusCode: '404',
        error: 'Help Article Not Found',
        name: 'William Barnes'
    }) 
})

app.get('*', (req, res) => {
    res.render('error', {
        statusCode: '404',
        error: 'Page Not Found',
        name: 'William Barnes'
    })   
})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})