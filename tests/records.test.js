/*
Tests against api are here.
Each test group and individual case have their explanations with them.
*/
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('valid cases', () => {
	test('hello world: successful valid query', async () => {

		const query = {
			'startDate': '2016-01-29',
			'endDate': '2016-02-02',
			'minCount': 2700,
			'maxCount': 3000
		}

		const response = await api
			.post('/api/records')
			.send(query)
      
		expect(response.body.code).toEqual(0)
		expect(response.body.msg).toEqual('Success')
		expect(response.body.records).toHaveLength(1)
		expect(response.body.records[0].key).toEqual('bxoQiSKL')
	})
})

describe('invalid cases', () => {
	test('minCount > maxCount', async () => {

		const query = {
			'startDate': '2016-01-29',
			'endDate': '2016-02-02',
			'minCount': 3100,
			'maxCount': 3000
		}

		const response = await api
			.post('/api/records')
			.send(query)
      
		expect(response.body.code).toEqual(0)
		expect(response.body.msg).toEqual('Success')
		expect(response.body.records).toHaveLength(0)
	})

	test('startDate missing', async () => {

		const query = {
			'endDate': '2016-02-02',
			'minCount': 3100,
			'maxCount': 3000
		}

		const response = await api
			.post('/api/records')
			.send(query)
      
		expect(response.body.code).toEqual(0)
		expect(response.body.msg).toEqual('Success')
		expect(response.body.records).toHaveLength(0)
	})
})

afterAll(() => {
	mongoose.connection.close()
})