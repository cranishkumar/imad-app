var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'articleOne': {
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
    'articleTwo': {
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
    'articleThree': {
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
                    ${date}
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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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

app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
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
