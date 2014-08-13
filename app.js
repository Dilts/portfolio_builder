var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser());

app.get('/', indexController.index);

app.get('/admin', indexController.admin);

app.post('/file-upload', function(req, res, next) {
    console.log(req.body);
    console.log('files: ', req.files);
});


var server = app.listen(6720, function() {
	console.log('Express server listening on port ' + server.address().port);
});
