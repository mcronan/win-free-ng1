var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.get('/', indexController.landing);
app.get('/about', indexController.about);

// app.get('/templates/:templateName/', indexController.templates);


// Facebook Passport 
// configure strategy 
passport.use(new FacebookStrategy({
    clientID: '680909698714083',
    clientSecret: 'd05d6bbbf361b3cd09ecf4e5694c8d1a',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// Authenticate Requests
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });




app.listen(process.env.PORT || 3500);
