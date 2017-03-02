var mongoose = require('mongoose');

////////////////////////////////////////
// User Model
////////////////////////////////////////

var userSchema = new mongoose.Schema({
	name: {
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

mongoose.model('User', userSchema); 