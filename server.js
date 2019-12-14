const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/comments.db');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../Eternal Story'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(request, response){
  response.send('Hello, world');
});

app.get('/comments', function(request, response){
  console.log('GET request received at /comments');
  db.all('SELECT * FROM comments', function(err, rows){
    if(err) {
      console.log("Error: " + err);
    }
    else {
      response.send(rows);
    }
  })
});

app.post('/comments', function(request, response){
  console.log('POST request received at /comments');
  db.run('INSERT INTO comments VALUES (?)', [request.body.comment], function(err){
    if(err){
      console.log("Error: " + err);
    }
    else{
      response.status(200).redirect('index.html');
    }
  })
})

app.get("/comments.db",(req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.listen(3000, function(){
  console.log('Server is running');
});
