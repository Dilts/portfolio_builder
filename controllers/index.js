var portfolioModel = require('../models/user.js')

var indexController = {
	index: function(req, res) {
		portfolioModel.findOne({}, function(err, portfolio){
	    	if (err) {
	    		console.log('error not finding', err)
	    		res.send(500, 'did not find')
	    	}
	    	else {
	    		res.render('index', {
	    			profile: portfolio
	    		});
	    	}
		})

	},

	admin: function(req, res) {
		res.render('admin');
	},

	createProfile: function(req, res) {
    console.log(req.body);
    console.log('files: ', req.files);
    var profile = new portfolioModel({
    	 name: req.body.name, 
    	 job: req.body.job,
    	 byline: req.body.byline
    })
    console.log(profile)
    profile.save(function(err, doc) {
    	if (err) {
    		console.log('error not saving', err)
    		res.send(500, 'did not save')
    	}
    	else {
    		res.redirect('/')
    	} 

    })
	},

};

module.exports = indexController;