const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BooksDb');
const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
    firstname : String,
    lastname : String,
    email : String,
    password : String
});

var NewUserData = mongoose.model('user', NewUserSchema,'user'); //BookModel is the model and NewBookData is the schema

module.exports = NewUserData;