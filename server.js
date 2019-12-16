const http = require('http');
const fs = require('fs');
const con = require("./DBconnection")

const hostname = '127.0.0.1'
const port = "3000"

const server = http.createServer((req, res) => {
  if (req.method == 'GET' && req.url == '/')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('./index.html').pipe(res);
  }

  else if (req.method == 'GET' && req.url == '/styles.css')
  {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/css');
    fs.createReadStream('./styles.css').pipe(res);
  }

  else if (req.method == 'GET' && req.url == '/home')
  {
    res.statusCode == 200;
    res.setHeader('Content-Type', 'application/json');

    var conn = con.getConnection();

    conn.query('SELECT * FROM thestory.comment', function(error, results, fields){
      if(error) throw error;

      var story = JSON.stringify(results);
      res.end(story);

    });

    conn.end();
  }


  else if(req.method == "POST" && req.url == "/insert")
  {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');

      var content = '';
      req.on('data', function(data){
          content += data;

          var obj = JSON.parse(content);
          console.log(content);

          console.log("The story is: "+ obj.message);
          var conn = con.getConnection();

          conn.query('INSERT INTO thestory.comment (comment.story)',[obj.message], function(error, results, fields){
          if(error) throw error;
          console.log("Success!");
      });

      conn.end();
      res.end("Success!");
      });
  }

  else if (req.method == 'GET' && req.url == '/story.js')
  {
    res.writeHead(200, {"Content-Type":"text/javascript"});
    fs.createReadStream("./story.js").pipe(res);
  }

});

server.listen(port, hostname, () =>{
  console.log('Server running at port 3000')
});
