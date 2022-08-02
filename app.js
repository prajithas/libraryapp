const express= require('express');
const BookData = require('./src/model/BookModel');
const UserData = require('./src/model/UserModel');
const cors = require('cors');
const app = new express();
const path = require('path');
app.use(cors());
const jwt= require('jsonwebtoken');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// username="admin";
// password="1234";
app.use(express.static('./dist/frontend'));
/*Routing Methods*/
app.get('/api/',function(req,res){
    res.send('Hello World!');
});
app.get('/api/books',function(req,res){
    
    BookData.find()
                .then(function(books){
                    res.send(books);
                });
});
app.get('/api/books/:id',function(req,res){
   const id = req.params.id;
 // console.log(id);
  BookData.findOne({"_id":id})
  .then(function(books){
  //console.log(books);
    res.send(books);
  });
});
function verifyToken(req,res,next){
  if(!req.headers.authorization){
      return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token=='null'){
      return res.status(401).send('Unauthorizes request')
  }
  let payload=jwt.verify(token,'secretKey')
  console.log(payload);
  if(!payload){
      return res.status(401).send('Unauthorized request')
  }
  req.userId=payload.subject
  next()
}

app.post('/api/login',(req,res)=>{
  let userData= req.body;
  console.log(userData);
  UserData.findOne({ email: req.body.username})
  .then((user)=>{
  if(!user){console.log(user.email);
      res.status(401).send("Invalid Username")
  }else{
    let username=user.email;console.log(username);
      if(user.password!==userData.password){
          res.status(401).send("Invalid Password")
      }else{
        let password=user.password;
          let payload = {subject:username+password}
          let token = jwt.sign(payload,'secretKey')
          res.status(200).send({token});
      }
  }
})
});
app.post('/api/register',(req,res)=>{
  let userData= req.body;
  console.log( req.body.user.firstname);
  var user = {       
    firstname : req.body.user.firstname,
    lastname : req.body.user.lastname,
    email : req.body.user.email,
    password : req.body.user.password
}       
var user = new UserData(user);
user.save();
}
);
//Insert a new book
app.post('/api/insert',verifyToken,function(req,res){
   //console.log(token);
  console.log(req.body);
 
  var book = {       
      title : req.body.book.title,
      category : req.body.book.category,
      author : req.body.book.author,
      publisher : req.body.book.publisher,
      about : req.body.book.about,
      image : req.body.book.image
 }       
 var book = new BookData(book);
 book.save();
});

app.put('/api/update',(req,res)=>{
  console.log(req.body)
  id=req.body._id,
  title= req.body.title,
  category = req.body.category,
  author = req.body.author,
  publisher = req.body.publisher,
  about = req.body.about,
  image = req.body.image
  BookData.findByIdAndUpdate({"_id":id},
                              {$set:{"title":title,
                              "category":category,
                              "author":author,
                              "publisher":publisher,
                              "about":about,
                              "image":image,
                              }})
 .then(function(){
     res.send();
 })
})

app.delete('/api/remove/:id',(req,res)=>{

 id = req.params.id;
 BookData.findByIdAndDelete({"_id":id})
 .then(()=>{
     console.log('success')
     res.send();
 })
})
 



app.get('*', function(req, res) {
  res.sendFile('./dist/frontend/index.html');
 });

const port= (process.env.PORT || 5000);
app.listen(port, (err) => {
  if (err)return console.error(err);
  return console.log(`server is listening on ${port}`);
});