var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Location = require('../models/location');

router.post('/', function(req, res, next){
	console.log(req.body.location);
	console.log(req.body.user);

	let locationName = req.body.location;
	var newLocation = new Location({
		name: locationName
	});

	User.findOne({_id: req.body.user.id}, function(err, user) {
		if(err){
	     	console.log(err);
	    }
		newLocation.userId = user.id;
		newLocation.save(function(err, location){
			if (err){
				return console.log("save error: " + err);
			}
			console.log("saved",location.name,"to",location.user);
			res.json(location);
		});
	});
});

router.post('/profile', function(req, res){

	let userToFind = req.body.user.id;

	Location.find({ userId: userToFind }, function(err, location) {
		if(err){
			console.log(err);
		}
   		console.log(location);
   		res.send(location);
   	})

});

module.exports = router;