var User = require('../models/model');


var indexController = {

	index: function(req, res) {
		res.render('index', { message: req.flash('signupMessage') });
		console.log("this is an index test")
	},
	
	templates: function(req, res) {
		res.render('templates/' + req.params.templateName)
	},
	about: function(req, res) {
		res.render('about');
		console.log("this is an about test")
	},

	form: function(req, res) {
		res.render('form');
	},

	video: function(req, res) {
		res.render('video')
	},

	reference: function(req, res) {
		res.render('reference')
	},
	
	landing: function(req, res) {
		res.render('landing');
		console.log("this is an landing test")
	}
}

module.exports = indexController;