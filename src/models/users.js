var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
   email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  bhamashahid:{
    type:String,
    unique:true,
    required:true
  },
 phone:{
      type: Number,
      required:true,
      unique:true
  },
  password: {
    type: String,
    required: true
  },
  name:String,
  pincode:{
      type:Number,
      required:true
  },
  location:{
      type:String,
      required:true
  }
  
});

module.exports = mongoose.model('User', UserSchema);