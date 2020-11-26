const path = require('path')
const express = require('express');
const hbs = require('hbs');
const { query } = require('express');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Yogi'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about Me',
        name: 'Yogi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'how may i help you?',
        title: 'help',
        name: 'yogi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'please provide an address'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})
 
app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'please search for some shit'
        })
    }

    console.log(req.query.search)   
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'yogi',
        notFound: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'yogi',
        notFound: 'page not found'
    })
})

app.listen(port, () => {
    console.log('server started on port ' + port)
})