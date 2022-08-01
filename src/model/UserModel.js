const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://booklibrary:X6Eb18cbEOtZIo4W@bookslibrary.isu9a.mongodb.net/test');
const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
    firstname : String,
    lastname : String,
    email : String,
    password : String
});

var NewUserData = mongoose.model('user', NewUserSchema,'user'); //BookModel is the model and NewBookData is the schema

module.exports = NewUserData;