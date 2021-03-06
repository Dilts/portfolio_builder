var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var mongoose = require('mongoose');
var app = express();


// ___________________Added for passport

// Express Session allows us to use Cookies to keep track of
// a user across multiple pages. We also need to be able to load
// those cookies using the cookie parser
var session = require('express-session');
var cookieParser = require('cookie-parser');

// Flash allows us to store quick one-time-use messages
// between views that are removed once they are used.
// Useful for error messages.
var flash = require('connect-flash');

// Load in the base passport library so we can inject its hooks
// into express middleware.f
var passport = require('passport');

// Load in our passport configuration that decides how passport
// actually runs and authenticates
var passportConfig = require('./config/passport');

// Pull in our two controllers...
var indexController = require('./controllers/index');
var authenticationController = require('./controllers/authentication');

var LocalStrategy = require('passport-local').Strategy 

// _____________End of passport additions

		// Commented out this mongoose call and replace with
		// the bottom one for pasport
// mongoose.connect('mongodb://localhost')
mongoose.connect('mongodb://localhost/express-passport-local');


app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));



app.use(multer({ 
	dest: './public/uploads/',
	onFileUploadComplete: function(file){
		console.log('file saved: ', file)
	}
	}))


// _____________Added for passport

// Add in the cookieParser and flash middleware so we can
// use them later
app.use(cookieParser());
app.use(flash());

// Initialize the express session. Needs to be given a secret property
app.use(session({secret: 'secret'}));

// Hook in passport to the middleware chain
app.use(passport.initialize());

// Hook in the passport session management into the middleware chain.
app.use(passport.session());


// Our get request for viewing the login page
app.get('/auth/login', authenticationController.login);

// Post received from submitting the login form
app.post('/auth/login', authenticationController.processLogin);

// Post received from submitting the signup form
app.post('/auth/signup', authenticationController.processSignup);

// Any requests to log out can be handled at this url
app.get('/auth/logout', authenticationController.logout);

// ***** IMPORTANT ***** //
// By including this middleware (defined in our config/passport.js module.exports),
// We can prevent unauthorized access to any route handler defined after this call
// to .use()
app.use(passportConfig.ensureAuthenticated);

// Because this route occurs after the ensureAuthenticated middleware, it will require
// authentication before access is allowed.
app.get('/', indexController.index);

// _____________End of passport additions


// app.get('/', indexController.index);

// app.get('/admin', indexController.admin);

app.get('/admin/:id', indexController.dashboard);

app.get('/test/:id', indexController.uniqueProfile);

app.post('/file-upload', indexController.createProfile);

app.post('/portfolio-upload', indexController.addToProfile);

app.post('/portfolio-upload-bio', indexController.addBioToProfile);

app.post('/portfolio-upload-theme', indexController.addThemeToProfile);

app.post('/file-upload-social', indexController.addSocialToProfile);


var server = app.listen(6720, function() {
	console.log('Express server listening on port ' + server.address().port);
});
