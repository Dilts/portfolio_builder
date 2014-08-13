var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost')


app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));


app.use(multer({ dest: './uploads/'}))

app.get('/', indexController.index);

app.get('/admin', indexController.admin);

app.post('/file-upload', indexController.createProfile);


var server = app.listen(6720, function() {
	console.log('Express server listening on port ' + server.address().port);
});
