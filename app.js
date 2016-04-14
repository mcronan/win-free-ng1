var express = require('express');
var app = express();
var indexController = require('./controllers/index.js');
// var apiController = require('./controllers/api.js');

var passport = require('passport');
// var FacebookStrategy = require('passport-facebook').Strategy


// passport
var morgan       = require('morgan');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session      = require('express-session');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/winfree');

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================


app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


app.get('/about', indexController.about);
app.get('/', indexController.index);
// app.get('/templates/:templateName/', indexController.templates);
app.get('/form', indexController.form);
app.get('/video', indexController.video);
app.get('/reference', indexController.reference);

// api controller 
// app.post('/api/users', apiController.userUpdate)
// app.get('/api/users', apiController.get)



// Facebook Passport 
// configure strategy 
// passport.use(new FacebookStrategy({
//     clientID: '680909698714083',
//     clientSecret: 'd05d6bbbf361b3cd09ecf4e5694c8d1a',
//     callbackURL: "http://localhost:3500/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// // Authenticate Requests
// app.get('/auth/facebook', passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(process.env.PORT || 3500);