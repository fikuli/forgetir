const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const recordsRouter = require('./controllers/records')
const express = require('express')
const app = express()

const url = config.MONGODB_URI
logger.info('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.info('error connecting to MongoDB:', error.message)
	})

app.use(express.json())
app.use('/api/records', recordsRouter)

module.exports = app
