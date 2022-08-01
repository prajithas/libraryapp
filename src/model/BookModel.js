const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BooksDb');
const Schema = mongoose.Schema;

var NewBookSchema = new Schema({
    title : String,
    category : String,
    author : String,
    publisher : String,
    about : String,
    image : String
});

var NewBookData = mongoose.model('books', NewBookSchema,'books'); //BookModel is the model and NewBookData is the schema

module.exports = NewBookData;