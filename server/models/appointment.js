var mongoose = require('mongoose');

////////////////////////////////////////
// User Model
////////////////////////////////////////

var appointmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	userid:{
		type: String,
		required: true,
		trim: true
	},
	date: {
		type: Date,
		required: true,
		trim: true
	},
	time: {
		type: String,
		required: true,
		trim: true
	},
	complain: {
		type: String,
		required: true,
		trim: true
	}
},{
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

mongoose.model('Appointment', appointmentSchema); 