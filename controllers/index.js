
var userModel = require('../models/user.js')

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
    // Images of work
    // req.user.portfolio.image = req.files.image.name
    // req.user.portfolio.url = req.body.url
    // Skills 

    console.log(req.user)
    req.user.save(function(err, doc) {
    	if (err) {
    		console.log('error not saving', err)
    		res.send(500, 'did not save')
    	}

    }) 

    res.render('admin', req)

	},

	addToProfile: function(req, res) {
		
		// Clear array to prevent duplicates loading
		// req.user.portfolio = []

		// Images of work
		req.user.portfolio.push({
			image: req.files.image.name,
			url: req.body.url
		})
		
		// req.user.bio = req.body.bio 
		
		// // Skills 

		// req.user.skills({
		// 	dslr: req.body.dslr,
		// 	lens: req.body.lens,
		// 	lightbox: req.body.lightbox,
		// 	film: req.body.film
		// })
		
		console.log(req.user)
		req.user.save(function(err, doc) {
			if (err) {
				console.log('error not saving pictures', err)
				res.send(500, 'did not save')
			}

		}) 

		res.render('admin', req)
	},

	addBioToProfile: function(req, res) {

		
		req.user.bio = req.body.bio 
		
		
		// console.log(req.user)
		req.user.save(function(err, doc) {
			if (err) {
				console.log('error not saving', err)
				res.send(500, 'did not save bio info')
			}

		}) 

		res.render('admin', req)
	},

	addThemeToProfile: function(req, res) {

		console.log('pushing new theme');

		// Clear array to prevent duplicates loading
		req.user.themes = []

		req.user.themes.push({
			fancy: req.body.fancy,
			pretty: req.body.pretty
		})		
		
		// console.log(req.user)
		req.user.save(function(err, doc) {
			if (err) {
				console.log('error not saving', err)
				res.send(500, 'did not save theme info')
			}

		}) 

		res.render('admin', req)
	},

	addSocialToProfile: function(req, res) {

		
		req.user.email2 = req.body.email2 
		req.user.twitter = req.body.twitter 
		req.user.facebook = req.body.facebook 
		
		
		// console.log(req.user)
		req.user.save(function(err, doc) {
			if (err) {
				console.log('error not saving', err)
				res.send(500, 'did not save social info')
			}

		}) 

		res.render('admin', req)
	},

	dashboard: function(req, res){
		console.log(req.params)
		var findOneAdmin = userModel.findOne({_id: req.params.id}, function(err, doc) {
			console.log('this is a', doc)
		res.render('admin', {
			user: req.user
		})

		})
	},

	uniqueProfile: function(req, res){
		var findOneProfile = userModel.findOne({_id: req.params.id}, function(err, doc) {
			console.log('this should work ', doc)
		res.render('test', {
			user: req.user
		})

		})
	}
};

module.exports = indexController;