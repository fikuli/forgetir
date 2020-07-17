require('dotenv').config()
const express = require('express')
const app = express()
const Record = require('./models/record')

app.use(express.json())


app.get('/', (request, response) => {
  res.send('<h1>Hello World!</h1>')
})

app.post('/api/records', (request, response) => {
  const query = request.body
  console.log(query)
  
  Record.aggregate([
    {
      $project: {
        _id: 0,
        totalCount: { $sum: "$counts"},
        createdAt: "$createdAt",
        key: "$key"
      }
    }, 
    { "$match" : { 
      totalCount : { "$gte" : query.minCount, "$lte": query.maxCount },
      createdAt: {"$gte" : new Date(query.startDate), "$lte": new Date(query.endDate)}
    } }
  ]).then(records => {

    let result ={
      "code": 0,
      "msg": "Success",
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

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
