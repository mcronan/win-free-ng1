var indexController = {

	index: function(req, res) {
		res.render('index');
		console.log("this is an index test")
	},
	
	templates: function(req, res) {
		res.render('templates/' + req.params.templateName)
	},
	about: function(req, res) {
		res.render('about');
		console.log("this is an about test")
	},
	
	landing: function(req, res) {
		res.render('landing');
		console.log("this is an landing test")
	}
}

module.exports = indexController;