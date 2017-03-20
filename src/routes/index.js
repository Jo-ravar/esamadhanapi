var express = require('express'); //importing express modulue
var router = express.Router();  //creating router object
var User = require('../models/users');  
var passport = require('../utilities/userpassport');
var jwt = require('jsonwebtoken'); 
var config = require('../utilities/config');
var Passport = require('passport');

router.route('/register')
.post(function(req, res) {  
  if(!req.body.email || !req.body.password || !req.body.phone ||!req.body.location ||!req.body.pincode ||!req.body.bhamashahid) {
        console.log(req.body.name+" "+req.body.email+" ");
    res.json({ success: false, message: 'Please fill all details.' });
  } else {

    var nameStr;
    if(!req.body.name)
    nameStr="Not available"
    else
    nameStr = req.body.name;
    


    var newUser = new User({
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      location:req.body.location,
      name:nameStr,
      pincode:req.body.pincode,
      phone:req.body.phone,
      bhamashahid:req.body.bhamashahid
    });

    // Attempt to save the user
    newUser.save(function(err) {
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

 User.findOne({ $or:[{  phone: req.body.phone} , {email:req.body.email}] }, function (err, user) {
      if (err) { throw err; }
      else{
        if (!user) {  
           res.send({ success: false, message: 'Authentication failed. User not found.' }); }
      else{
        if (user.password !== req.body.password) { 
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
      }else{
      var payload = {id: user._id};
       var token = jwt.sign(payload, config.secret,{
            expiresIn: 2592000 // in seconds
          });
          res.json({ success: true, token: 'JWT ' + token });
      } }} });

});

router.route('/edit')
 .post(Passport.authenticate('jwt', { session: false }),function(req,res){

  var nameStr;
    if(!req.body.name)
    nameStr="Not available"
    else
    nameStr = req.body.name;
    

  
    var newData={
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      location:req.body.location,
      name:nameStr,
      pincode:req.body.pincode,
      phone:req.body.phone,
      bhamashahid:req.body.bhamashahid
    }
    var id =req.user._id;
    var query={_id:id};

    User.update(query,{$set:newData},{new:false},function(err,result){
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

 router.route('/getuser')
 .get(Passport.authenticate('jwt', { session: false }),function(req,res){
    var id =req.user._id;
    var query={_id:id};
    User.find(query,function(err,data){
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