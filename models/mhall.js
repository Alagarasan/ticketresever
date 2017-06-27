let mongoose = require('mongoose');

let hallSchema = new mongoose.Schema({  
  HNm: {type: String},										// Hall Name
  NoSt: {type: String},									    // Number of Seats
  Seats: [{
  	ROrd: {type: Number},
  	Row: [{
  		SOrd: {type: Number},
  		Bkd: {type: Number}
  	}]
  }],
  CrBy: {type: String},
  MdBy: {type: String},
  CrAt: {type: Date, default: Date.now},
  MoAt: {type: Date, default: Date.now}
});

let hallObj = mongoose.model('hall', hallSchema);  
module.exports = {hall: hallObj};