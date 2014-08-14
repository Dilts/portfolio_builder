
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
	    			profile: portfolio,
	    			user: req.user
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
    // var profile = new portfolioModel({
    // 	 name: req.body.name, 
    // 	 job: req.body.job,
    // 	 byline: req.body.byline
    // })
    req.user.name = req.body.name
    req.user.byline = req.body.byline
    req.user.job = req.body.job
    req.user.hero = req.files.hero.name

    console.log(req.user)
    req.user.save(function(err, doc) {
    	if (err) {
    		console.log('error not saving', err)
    		res.send(500, 'did not save')
    	}

    }) 

    res.render('admin', req)

	},

	pokemon: function(req, res){
		console.log(req.params)
		var findOneAdmin = portfolioModel.findOne({_id: req.params.id}, function(err, doc) {
			console.log('this is a', doc)
		res.render('admin', {
			user: req.user
		})

		})
	}
};

module.exports = indexController;