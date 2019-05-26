const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Jacob Smagin',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather app',
        name: 'Jacob Smagin',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather app',
        name: 'Jacob Smagin',
        message: 'Fuck off',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Nezadal jsi adresu debile',
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, {currently}) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                location,
                temperature: currently.temperature,
            })
        })
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Zkus google'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Debile'
    })
})

app.listen(port, () => {
    console.log('Server is up on port:', port)
})