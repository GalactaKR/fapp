const path = require('path')
const favicon = require('serve-favicon')
const compress = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const logger = require('./logger')

const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')

const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./app.hooks')
const channels = require('./channels')

const mongoose = require('./mongoose');
const historyService = require('./services/history/history.service')

const app = express(feathers())

// Load app configuration
app.configure(configuration())
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet())
app.use(cors())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(favicon(path.join(app.get('public'), 'favicon.ico')))
// Host the public folder
app.use('/', express.static(app.get('public')))

// Set up Plugins and providers
app.configure(express.rest())
app.configure(socketio())

app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware)
// Set up our services (see `services/index.js`)
app.configure(services)
// Set up event channels (see channels.js)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(express.notFound())
app.use(express.errorHandler({ logger }))

app.hooks(appHooks)

module.exports = app

//////////////////////////////////
console.log(Object.keys(app.services))
// const pService = app.service('posts')
// pService.find()
//     .then(function(data){ console.log(data)})
// pService.create({
//     title: 'What',
//     location: 'Chengdu',
// })
//     .then(function(data){console.log(data)})
    
    const pService = app.service('posts')
    pService.find()
        .then(function(res){ console.log(res)})
      .catch(function(err){ console.log(err)})

    const hService = app.service('history')
      hService.find()
          .then(function(data){ console.log(data)})
        hService.create({
                name: 'Caocao',
                gender: 'Male',
            })
                .then(function(data){console.log(data)})
                