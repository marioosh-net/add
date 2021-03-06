var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('workerlog', ['workerlog']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/workerlog', function (req, res) {
	console.log("Recived a GET request")
	db.workerlog.find(function (err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/workerlog', function(req, res) {
	console.log(req.body);
	db.workerlog.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

app.delete('/workerlog/:id', function (req, res) {
	var id = req.params.id;
	console.log('User deleted with id =');
	console.log(id);
	db.workerlog.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});
app.get('/workerlog/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.workerlog.findOne({_id: mongojs.ObjectId(id)}, function (err,doc) {
		res.json(doc);
	});
});
app.put('/workerlog/:id', function(req, res) {
	var id = req.params.id;
	console.log('edited successfully');
	db.workerlog.update({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {Time_off: req.body.Time_off}},
		new: true}, function (err, doc){
			res.json(doc);
		});
});



app.listen(3000);
console.log("Server running on port 3000");