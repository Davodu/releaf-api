import mongoose from 'mongoose';
let Schema = mongoose.Schema; 


let companySchema = new Schema({
	id: Number,
	name: String,
	num_employees: Number,
	contact_email: String,
	year_founded: Number,
	contact_name: String,
	rankings:{
		financials: Number,
		team: Number,
		idea: Number
	}
});

module.exports = mongoose.model('Company', companySchema);