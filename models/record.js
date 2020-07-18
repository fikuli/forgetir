/*
- Record resource schema is defined here.
- Since the assignment does not include any insertions to the database,
	no validation rules are defined for the fields.
*/
const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
	key: String,
	createdAt: Date,
	counts: [Number],
})
  
recordSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.value
	}
})
  
module.exports = mongoose.model('Record', recordSchema)