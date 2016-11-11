var bodyParser = require('body-parser');

module.exports = function(router) {
	router.use(
		bodyParser.json(),
		bodyParser.urlencoded({extended: false})
	)
}
