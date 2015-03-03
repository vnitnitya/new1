var express = require('express');
var mongojs = require('mongojs');
var db= mongojs("mongodb://abc:1234@ds061558.mongolab.com:61558/cse",["serviceClients"]);
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.get("/serviceClients",function(req,res){
db.serviceClients.find(function(err,docs){
		res.json(docs);
	});
});
app.post("/serviceClients",function(req,res){
  var svc = req.body;
  console.log(svc);
  db.serviceClients.insert(req.body, function(err,doc){
  res.json(doc);
});
});
app.get("/serviceClients/:id",function(req,res){
  var id= req.params.id;
  console.log(id);
  db.serviceClients.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
  	res.json(doc);
  	});
});

app.delete("/serviceClients/:id",function(req,res){
var id = req.params.id;
console.log(id);
db.serviceClients.remove({_id:mongojs.ObjectId(id)},function(err,doc){
	res.json(doc);
});
});
app.listen(process.env.PORT||5000);
console.log("Server running on port no 5000");
