/*
api port and database uri are read here from .env file.
Since we are using an assignment(test) database, I did not hide username and password
	and pushed them to git repo with the .env file.
*/
require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

module.exports = {
	MONGODB_URI,
	PORT
}