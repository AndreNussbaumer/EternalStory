const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/writestory');

app.use(express.static(__dirname + '/../Eternal Story'));
//routes

app.get('/', function(request, response){
  response.send('Hello, world');
});

app.get('/writestory', function(request, response){
  console.log('GET request received at /writestory');
  db.all('SELECT * FROM writestory', function(err, rows){
    if(err){
      console.log("Error: " + err);
    }
    else{
      response.send(rows);
    }
  })
});

app.post('/writestory', function(request, response){
  console.log('POST request received at /writestory');
});

app.listen(3000, function(){
  console.log('Server is running');
});
