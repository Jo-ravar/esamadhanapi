var express = require('express'); //importing express modulue
var router = express.Router();  //creating router object
var Lawyer = require('../models/lawyers');  
var passport = require('../utilities/userpassport');
var jwt = require('jsonwebtoken'); 
var config = require('../utilities/config');
var moment = require('moment'); 
var Passport = require('passport');

router.route('/register')
.post(function(req, res) {  
  if(!req.body.name||!req.body.email || !req.body.password || !req.body.phone ||!req.body.location 
    ||!req.body.pincode ||!req.body.dob) {
    res.json({ success: false, message: 'Please fill all details.' });
  } else {

  var edStr,quStr,weStr,aoeStr,leStr;

  if(!req.body.education)
    edStr="Not available";
  else
    edStr=req.body.education;

  if(!req.body.qualification)
     quStr="Not available";
  else
     quStr=req.body.qualification;

  if(!req.body.we)
     weStr="Not available";
  else
    weStr=req.body.we;          
    
  if(!req.body.aoe)
    aoeStr="Not available";
  else
    aoeStr=req.body.aoe;

  if(!req.body.le)
   leStr="Not available";
  else
   leStr=req.body.le;   

     


    var newLawyer = new Lawyer({
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      location:req.body.location,
      name:req.body.name,
      pincode:req.body.pincode,
      phone:req.body.phone,
      dob:req.body.dob,
      education:edStr,
      qualification:quStr,
      we:weStr,
      aoe:aoeStr,
      le:leStr
    });

    // Attempt to save the Lawyer
    newLawyer.save(function(err) {
      if (err) {
          console.log("Error in signup "+JSON.stringify(err));
        return res.json({ success: false, message: 'That email address or username already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
});

router.route('/login')
.post( function(req, res) {  

 Lawyer.findOne({email:req.body.email }, function (err, lawyer) {
      if (err) { throw err; }
      else{
        if (!lawyer) {  
           res.send({ success: false, message: 'Authentication failed. User not found.' }); }
      else{
        if (lawyer.password !== req.body.password) { 
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
      }else{
      var payload = {id: lawyer._id};
      console.log("Login tym payload "+payload);
       var token = jwt.sign(payload, config.secret,{
            expiresIn: 2592000 // in seconds
          });
          res.json({ success: true, token: 'JWT ' + token });
      } }} });

});

router.route('/edit')
 .post(Passport.authenticate('jwt', { session: false }),function(req,res){
   console.log("Auth is done....");
   var edStr,quStr,weStr,aoeStr,leStr;

  if(!req.body.education)
    edStr="Not available";
  else
    edStr=req.body.education;

  if(!req.body.qualification)
     quStr="Not available";
  else
     quStr=req.body.qualification;

  if(!req.body.we)
     weStr="Not available";
  else
    weStr=req.body.we;          
    
  if(!req.body.aoe)
    aoeStr="Not available";
  else
    aoeStr=req.body.aoe;

  if(!req.body.le)
   leStr="Not available";
  else
   leStr=req.body.le;

    var newData={
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      location:req.body.location,
      name:req.body.name,
      pincode:req.body.pincode,
      phone:req.body.phone,
      dob:req.body.dob,
      education:edStr,
      qualification:quStr,
      we:weStr,
      aoe:aoeStr,
      le:leStr
    }
    var id =req.user._id;
    console.log("Check For The Id "+id);
    var query={_id:id};

    Lawyer.update(query,{$set:newData},{new:false},function(err,result){
      if(err)
      {
        console.log("Error in Editing"+JSON.stringify(err));
        res.send({ success: false, message: 'Unsuccessful' });
      }
      else
      {
         console.log("New Data"+JSON.stringify(result));
         res.send({ success: true, message: 'Profile Updated' });
      }
    });

 });

 router.route('/getlawyer')
 .get(Passport.authenticate('jwt', { session: false }),function(req,res){
    var id =req.user._id;
    var query={_id:id};
    Lawyer.find(query,function(err,data){
       if (err) {
                    console.error(JSON.stringify(err));
                }
                else {
                      console.log(" USer data send"+data);
                        res.send(data);
                }
    })
 
 });


 module.exports = router;