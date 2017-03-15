//EXPRESS
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', require('cors')());

var routes = require('./lib/routes.js')(app);

//404 catch-all handler (middleware)
app.use(function(req, res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

//500 error handler (middleware)
app.use(function(err, req, res, next){
  // console.error(err.stack);
  res.status(500).render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
   app.get('port') + '; press Ctrl-C to terminate.');
});
