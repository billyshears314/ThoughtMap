var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var pg = require("pg");
var conString = "postgres://billy@localhost:5432/thoughtmap";
var client = new pg.Client(conString);				
			
client.connect();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/addThought', function(req, res){
	

	console.log(req.body.name);
	console.log(req.body.parent);
	console.log(req.body.level);
	
	var children = [];

 	var statement = 'INSERT INTO thoughts VALUES (default, $1, $2, $3, $4)';
	var params = [
  		req.body.name,
   	req.body.parent,
		children,   	
   	req.body.level,
  	];
 		 
 	var query = client.query(statement,params,function afterQuery(err,result){
 		console.log('Thought Added');
 		res.redirect('/');
 	});
 	
 	//query.on('end', function() { client.end(); });
 	
});

module.exports = router;
