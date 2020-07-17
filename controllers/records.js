const logger = require('../utils/logger')
const recordsRouter = require('express').Router()
const Record = require('../models/record')

recordsRouter.post('/', (request, response) => {
	const query = request.body
	logger.info(query)
  
	Record.aggregate([
		{
			$project: {
				_id: 0,
				totalCount: { $sum: '$counts'},
				createdAt: '$createdAt',
				key: '$key'
			}
		}, 
		{ '$match' : { 
			totalCount : { '$gte' : query.minCount, '$lte': query.maxCount },
			createdAt: {'$gte' : new Date(query.startDate), '$lte': new Date(query.endDate)}
		} }
	]).then(records => {

		let result ={
			'code': 0,
			'msg': 'Success',
		}

		result.records = records
		response.json(result)
	})

	/*** 
  Record.find({}).then(records => {
    response.json(records)
  })

  **/
})

/**
app.get('/api/records', (request, response) => {
  Record.find({}).then(records => {
    response.json(records)
  })
})
***/


module.exports = recordsRouter

