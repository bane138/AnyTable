var express = require('express');
var app = express();
var router = express.Router();

var path = __dirname + '/views/';

app.use('/', router);
router.get('/', function(req, res) {
	res.sendFile(path + 'index.html');
});

router.get('/games', function(req, res) {
	res.sendFile(path + 'games.html');
});

router.get('/about', function(req, res) {
	res.sendFile(path + 'about.html');
});

router.get('*', function(req, res) {
	res.send('Error 404: Not Found!');
})

app.listen(3000, function() {
	console.log('App running listening on port 3000');
});
