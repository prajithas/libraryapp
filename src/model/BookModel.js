const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://booklibrary:X6Eb18cbEOtZIo4W@bookslibrary.isu9a.mongodb.net/test');
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