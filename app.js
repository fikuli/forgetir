/*
main application
connects to the database and sets up the routers to handle HTTP POST requests.
*/
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const recordsRouter = require('./controllers/records')
const express = require('express')
const app = express()

const url = config.MONGODB_URI
logger.info('connecting to', url)

var connectWithRetry = function() {
	return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(error) {
		if (error) {
			logger.error('Failed to connect to database on startup - retrying in 5 sec', error)
			setTimeout(connectWithRetry, 5000)
		}
		else{
			logger.info('Connected to database')
		}
	})
}
connectWithRetry()

app.use(express.json())
app.use('/api/records', recordsRouter)

module.exports = app
