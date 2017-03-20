var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var lawyerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
      type:Number,
      required:true,
      unique:true
    },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  pincode:{
      type:Number,
      required:true
  },
  location:{
    type:String,
    required:true
  },
  dob:{
    type:String
  },
  education:{
      type:Array
  },
  qualification:{
      type:Array
  },
  we:{
      type:Array
  },
  aoe:{
     type:Array
  },
  le:{
    type:Array
  }

});

module.exports = mongoose.model('Lawyer', lawyerSchema);