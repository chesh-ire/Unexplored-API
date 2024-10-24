const mongoose = require('mongoose')
const {placeSchema} = require('./placeSchema')
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    refreshToken:String,
    places:[placeSchema]
})
const users = mongoose.model('users', userSchema);


module.exports = users;
