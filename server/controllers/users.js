////////////////////////////////////////
// User Server Side Controller
////////////////////////////////////////


var mongoose = require('mongoose');
var User = mongoose.model('User');
var Appointment = mongoose.model('Appointment');

function usersController(){

	////////////////////////////////////////
	// Index Route
	this.index = function(req,res){
		User.find({}, function(err,users){
			req.session.userId = "";
			req.json(users);
		})
	}
	// END Index Route
	////////////////////////////////////////

	////////////////////////////////////////
	// Create Route
	this.create = function(req,res){

		User.create(req.body, function(err,result){
			if(err){
				res.json(err)
			} else {
				res.json(result)
			}
		})

	}
	// END Create Route
	////////////////////////////////////////


	////////////////////////////////////////
	// Login Route
	this.login = function(req,res){
		var errors = {
			errors:{
				general: 'Invalid Login Information.'
			}
		}
		User.findOne({"name":req.body.name}).exec(function(err,user){
			console.log("Here is the user from the DB")
			console.log(user)
			if(!req.body.name || !user){
				res.json(errors);
			}else{
				req.session.userId = user._id;
				res.json(user);
			}
		})
	}	
	// END Login Route
	////////////////////////////////////////


	////////////////////////////////////////
	// Testing Route	
	this.home = function(req,res){
		User.findOne({_id: req.session.userId}).exec(function(err,user){
			if(err){
				res.status(500).send("Failure");
			} else {
				res.json(user);
			}
		});
	}
	// END Login Route
	////////////////////////////////////////


	this.appt = function(req,res){
		Appointment.create(req.body, function(err,result){
			if(err){
				console.log("There was an error creating the appointment")
			} else {
				console.log("Successfully created a new Appointment")
				res.json(result)
			}
		})
	}

	this.allAppts = function(req,res){
		Appointment.find({}, function(err, result){
			if (err){
				console.log("There was an error getting all appointments")
			} else {
				res.json(result)	
			}
			
		})
	}

	this.deleteAppt = function(req,res){
		Appointment.find({'_id': req.body.id}).remove().exec();
		Appointment.find({}, function(err, result){
			if (err){
				console.log("There was an error getting all appointments")
			} else {
				res.json(result)	
			}
			
		})
	}

	this.checkDate = function(req,res){
		console.log("Checking Date")
		Appointment.find({'date': req.params.date}, function(err, result){
			if (err){
				console.log("There was an error looking up that date")
			} else {
				console.log(result.length)
				res.json(result.length)
			}
		})
	}

}
module.exports = new usersController()