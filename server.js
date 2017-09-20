var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user: 'cranishkumar',
    database: 'cranishkumar',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD 
}; 

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session ({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

/*
var articles =
    'article-One': {
    title: 'Article one | Anish Kumar',
    heading: 'Article One',
    date: 'Sep 5, 2017',
    content: ` 
        <p>
            This is my article one.This is my article one.This is my article one.
            This is my article one.This is my article one.This is my article one.
            This is my article one.This is my article one.This is my article one.
        </p>
        <p>
            This is my article one details.This is my article one details.
            This is my article one details.This is my article one details.
            This is my article one details.This is my article one details.
        </p>`
},
    'article-two': {
    title: 'Article Two | Anish Kumar',
    heading: 'Article Two',
    date: 'Sep 5, 2017',
    content: ` 
        <p>
            This is my article two.
        </p>
        <p>
            This is my article two details.
        </p>
        `
},
    'article-three': {
    title: 'Article one | Anish Kumar',
    heading: 'Article Three',
    date: 'Sep 5, 2017',
    content: ` 
        <p>
            This is my article three.
        </p>
        <p>
            This is my article three details.
         </p>
         `
}
};
function createTemplate(data) {
    var title =  data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate =
        `
        <html>
        <head>
            <title>
                ${title}
            </title>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class=container>
                <div>
                    <a href="/">Home</a>
                </div>
                    <h3> 
                    ${heading}
                    </h3>
                <div>
                    ${date.toDateString()}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `
    ;
return htmlTemplate;
} 
*/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

//we need a hash
function hash(input, salt) {
    //How do we create a hasg
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join ('$');
}

app.get('/hash/:input', function(req, res) {
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user', function(req, res) {
    //username, password
    //{"username": "anish", "password": "password"}
    //JSON
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
        if (err){
          res.status(500).send(err.toString());
        } else {
          res.send('user successfully created:' + username);
        }
    });
});

app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    
    pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
             if (err){
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.send(403).send('username/password is invalid');
          } else {
              //Match the password
              var dbstring = result.rows[0].password;
              var salt = dbstring.split('$')[2];
              var hashedPassword = hash(password, salt);//Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbstring) {
                  
                  // set the session
                  req.session.auth = {userId: result.rows[0].Id};
                  // set cookie with a session id
                  // internally, on the server side it maps the session id to an object
                  // { auth: {{userId}}
                  res.send('Credentials correct!');
              } else {
                  res.send(403).send('username/password is invalid');
              }
          } 
      } 
    });
});

app.get('/check-login', function (req, res) {
    if (req.session && req.session.auth && req.session.auth.userId) {
        res.send('You are logged in: ' + req.session.auth.userId.toString());
    } else {
        res.send('You are not logged in');
    }
});

app.get('/logout', function (req, res) {
    delete req.session.auth;//delete the session object
    res.send("Logged out");
});


var pool = new Pool(config);
app.get('/test-db', function(req, res){
  //make a select request
  //return a response with the results
  pool .query('SELECT * from test', function (err, result){
      if (err){
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result));
      }
  })
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
  res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function (req, res) { //submit-name?name-xxx
  //get the name from the request    
  var name = req.query.name;
  
  names.push(name);
  //JSON JavascriptObjectNotation
  res.send(JSON.stringify(names));
});

//var pool = new Pool(config);
app.get('/articles/:articleName', function (req, res) {
  pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName + "'", function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(404).send("Article not found");
          } else {
              var articleData = result.rows[0];
              res.send(createTemplate(articleData));
          }
      }
  });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
