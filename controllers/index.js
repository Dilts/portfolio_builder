var indexController = {
	index: function(req, res) {
		res.render('index');
	},

	admin: function(req, res) {
		res.render('admin');
	}
};

module.exports = indexController;