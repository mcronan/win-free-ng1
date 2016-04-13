var User = require('../models/model');

var apiController = {

	userUpdate: function(req, res) {
		var newestUser = new User.User(req.body)
		console.log(req.body)
		newestUser.save(function(err,doc) {
			console.log(doc)
			res.send(doc)
		})
	}, 

	get: function(req, res) {
		User.User.find({}, function(err, doc) {
			res.send(doc)
		})
	}

}

module.exports = apiController;