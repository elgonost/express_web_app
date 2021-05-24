const express = require('express');
const path = require('path');
const app = express();
const fs = require("fs");
const mysql = require('mysql');

db = mysql.createConnection({
   host: '127.0.0.1',
   user: 'root',
   password: 'password',
   database: 'books_db'
})
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/books', function (req, res) {
   let sql = `select * from books`;
   db.query(sql, function(err, data, fields){
      if (err) throw err;
      res.json({
         data,
         message: "Books retrieved successfully"
      })
   })
});

app.post('/books', function(req, res) {
   let sql = `insert into books (author, title, genre, price) values ('${req.body.author}', '${req.body.title}', '${req.body.genre}', '${req.body.price}')`;
   db.query(sql, function(err, data, fields){
      if (err) throw err;
      res.json({
         data,
         message: "Book stored successfully"
      })
   })
})

app.get('/books/:keyword', function(req, res){
   let keyword = req.params.keyword
   let sql = `select * from books where title like '%${keyword}%'`
   db.query(sql, function(err, data, fields){
      if (err) throw err;
      if (data.length === 0) {
         var message = "No book retrieved"
      }
      else {
         var message = "Books retrieved successfully"
      }
      res.json({
         data,
         message: message
      })
   })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
  });

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})